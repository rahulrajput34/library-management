import { db } from "@/database/drizzle";
import {
  books,
  users,
  borrowRecords,
  BORROW_STATUS_ENUM,
} from "@/database/schema";
import { count, desc, eq, ilike, or, sql as dsql } from "drizzle-orm";

// number of records per page
export const PAGE = 10;

// single row type
export type BorrowRequestRow = Awaited<
  ReturnType<typeof listBorrowRequests>
>["data"][number];

export async function listBorrowRequests(opts: {
  page: number;
  q?: string;
  sort: "asc" | "desc";
}) {
  // parse pagination, search term, and sort order
  const { page, q, sort } = opts;

  // optional ILIKE filter on book title or user name/email
  const search = q
    ? or(
        ilike(books.title, `%${q}%`),
        ilike(users.fullName, `%${q}%`),
        ilike(users.email, `%${q}%`)
      )
    : undefined;

  // fetch paginated borrow requests joined with books and users
  const data = await db
    .select({
      id: borrowRecords.id,
      status: borrowRecords.status,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      bookId: books.id,
      bookTitle: books.title,
      bookCover: books.coverUrl,
      userId: users.id,
      userName: users.fullName,
      userEmail: users.email,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .innerJoin(users, eq(users.id, borrowRecords.userId))
    .where(search)
    .orderBy(
      sort === "asc" ? borrowRecords.borrowDate : desc(borrowRecords.borrowDate)
    )
    .limit(PAGE)
    .offset((page - 1) * PAGE);

  // count total matching records for pagination
  const [{ total }] = (
    await db.execute<{ total: number }>(
      dsql`
        SELECT COUNT(*)::int AS total
        FROM ${borrowRecords}
        INNER JOIN ${books} ON ${books.id} = ${borrowRecords.bookId}
        INNER JOIN ${users} ON ${users.id} = ${borrowRecords.userId}
        ${search ? dsql`WHERE ${search}` : dsql``}
      `
    )
  ).rows;

  return { data, total };
}
