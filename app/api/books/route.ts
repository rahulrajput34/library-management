// app/api/books/route.ts
import { NextResponse } from "next/server";
import { sql, or, ilike } from "drizzle-orm"; // ← use ilike
import { books as BooksTable } from "@/database/schema";
import { db } from "@/database/drizzle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = 12;

  // build optional ILIKE clause
  const whereClause = q
    ? or(ilike(BooksTable.title, `%${q}%`), ilike(BooksTable.author, `%${q}%`))
    : undefined;

  // count
  const countResult = await db
    .select({ count: sql<string>`count(*)` })
    .from(BooksTable)
    .where(whereClause)
    .execute();
  const total = parseInt(countResult[0].count, 10);

  // paginated rows
  const rows = await db
    .select({
      id: BooksTable.id,
      title: BooksTable.title,
      author: BooksTable.author,
      genre: BooksTable.genre,
      coverUrl: BooksTable.coverUrl,
      coverColor: BooksTable.coverColor,
    })
    .from(BooksTable)
    .where(whereClause)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(BooksTable.title)
    .execute();

  return NextResponse.json({ books: rows, total });
}
