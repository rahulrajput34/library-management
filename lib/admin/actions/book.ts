"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { bookSchema } from "@/lib/validation";
import { desc } from "drizzle-orm";

// book list
export async function listBooks() {
  return db.select().from(books).orderBy(desc(books.createdAt)).limit(10);
}

// get book by id
export async function getBookById(id: string) {
  return db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1)
    .then((res) => res[0]);
}

// create book with data we get it from the from
export const createBook = async (params: BookParams) => {
  try {
    // inserting the book into the database
    const newBook = await db
      .insert(books)
      .values({
        ...params, // spreading the params object for the book data
        availableCopies: params.totalCopies,
      })
      .returning();

    // success
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export async function updateBook(
  id: string,
  values: z.infer<typeof bookSchema>
) {
  const parsed = bookSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Invalid data." };
  }

  await db.update(books).set(parsed.data).where(eq(books.id, id));

  return { success: true, message: "Book updated.", data: { id }};
}

export async function deleteBook(id: string) {
  await db.delete(books).where(eq(books.id, id));
  return { success: true };
}
