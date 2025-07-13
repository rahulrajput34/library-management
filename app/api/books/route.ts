// app/api/books/route.ts
import { NextResponse } from "next/server";
import { sql, or, like } from "drizzle-orm";
import { books as BooksTable } from "@/database/schema";
import { db } from "@/database/drizzle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = 12;

  // build optional where clause
  const whereClause = q
    ? or(like(BooksTable.title, `%${q}%`), like(BooksTable.author, `%${q}%`))
    : undefined;

  // 1) get total count
  const countResult = await db
    .select({ count: sql<string>`count(*)` })
    .from(BooksTable)
    .where(whereClause)
    .execute();
  const total = parseInt(countResult[0].count, 10);

  // 2) fetch paginated rows
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
