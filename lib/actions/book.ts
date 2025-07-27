"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, STATUS_ENUM } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";
import { users } from "@/database/schema";
import { BorrowedConfirm } from "../email/BorrowedConfirm";

export type UserStatus = (typeof STATUS_ENUM.enumValues)[number];
export async function getUserStatus(
  userId: string
): Promise<UserStatus | null> {
  const [row] = await db
    .select({ status: users.status })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return row?.status ?? null;
}

// borrow Book from library
export const borrowBook = async (params: BorrowBookParams) => {
  // userId and bookId we get from the frontend
  const { userId, bookId } = params;

  const [{ status }] = await db
    .select({ status: users.status })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (status !== "APPROVED") {
    return {
      success: false,
      error:
        status === "PENDING"
          ? "Your account is awaiting admin approval."
          : "Your borrowing privileges have been revoked.",
    };
  }

  try {
    // check if the user has already borrowed this book.
    const alreadyBorrowed = await db
      .select({ id: borrowRecords.id })
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED")
        )
      )
      .limit(1);

    // if already borrowed
    if (alreadyBorrowed.length) {
      return {
        success: false,
        error: "You already have this book checked out.",
      };
    }

    // get that book which user selected.. id we get from url
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    // check if book is available  or not
    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // due date
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // add the record of borrowing details
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // decrease available copies
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    // fetch the user details
    const [userRow] = await db
      .select({ name: users.fullName, email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // fetch the book details
    const [bookRow] = await db
      .select({ title: books.title })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    // Format the due date to human readable format
    // 22 Jul 2025
    const borrowDateHuman = dayjs().format("DD MMM YYYY");
    const dueDateHuman = dayjs(dueDate).format("DD MMM YYYY");

    // send the e‑mail without holding the promise
    void BorrowedConfirm(
      userRow.email,
      userRow.name,
      bookRow.title,
      borrowDateHuman,
      dueDateHuman
    ).catch((err) => console.error("Borrow-email error:", err));

    // every thing was fine
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
