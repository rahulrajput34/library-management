import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, or, desc, sql as dsql } from "drizzle-orm";

// Page size
export const PAGE = 10;

// Book row type
export type BookRow = Awaited<ReturnType<typeof listBooks>>["data"][number];

// List books with pagination, filtering and sorting
export async function listBooks(opts: { page: number; q?: string }) {
  // Extract page number from query params
  const { page, q } = opts;
  // Filter and sort books
  const where = q
    ? or(
        ilike(books.title, `%${q}%`),
        ilike(books.author, `%${q}%`),
        ilike(books.genre, `%${q}%`)
      )
    : undefined;

  // Query books with pagination and sorting
  const data = await db
    .select()
    .from(books)
    .where(where)
    .orderBy(desc(books.createdAt))
    .limit(PAGE)
    .offset((page - 1) * PAGE);

  // Count total books
  const { rows } = await db.execute<{ total: number }>(
    dsql`SELECT COUNT(*)::int AS total
         FROM ${books}${where ? dsql` WHERE ${where}` : dsql``}`
  );

  // Return books and total count
  return { data: data as Book[], total: rows[0]?.total ?? 0 };
}
