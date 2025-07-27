import { db } from "@/database/drizzle";
import { users, books, borrowRecords } from "@/database/schema";
import { count, desc, eq, between } from "drizzle-orm";
import dayjs from "dayjs";

const today = dayjs();

// current month range
const monthStart = today.startOf("month").toDate();
const nextMonthStart = today
  .endOf("month")
  .add(1, "day")
  .startOf("day")
  .toDate();

// previous month range
const prevStart = dayjs(monthStart).subtract(1, "month").toDate();
const prevEnd = dayjs(monthStart).subtract(1, "day").endOf("day").toDate();

/* ─────────────────────────── metrics ─────────────────────────── */
export async function fetchDashboardMetrics() {
  /* current month */
  const [{ total: borrowNow }] = await db
    .select({ total: count() })
    .from(borrowRecords)
    .where(between(borrowRecords.borrowDate, monthStart, nextMonthStart));

  const [{ total: userNow }] = await db
    .select({ total: count() })
    .from(users)
    .where(between(users.createdAt, monthStart, nextMonthStart));

  const [{ total: bookNow }] = await db
    .select({ total: count() })
    .from(books)
    .where(between(books.createdAt, monthStart, nextMonthStart));

  /* previous month */
  const [{ total: borrowPrev }] = await db
    .select({ total: count() })
    .from(borrowRecords)
    .where(between(borrowRecords.borrowDate, prevStart, prevEnd));

  const [{ total: userPrev }] = await db
    .select({ total: count() })
    .from(users)
    .where(between(users.createdAt, prevStart, prevEnd));

  const [{ total: bookPrev }] = await db
    .select({ total: count() })
    .from(books)
    .where(between(books.createdAt, prevStart, prevEnd));

  return {
    borrowed: { now: borrowNow, delta: borrowNow - borrowPrev },
    users: { now: userNow, delta: userNow - userPrev },
    books: { now: bookNow, delta: bookNow - bookPrev },
  };
}

export async function pendingBorrowRequests(limit = 5) {
  return db
    .select({
      id: borrowRecords.id,
      title: books.title,
      author: books.author,
      cover: books.coverUrl,
      borrowDate: borrowRecords.borrowDate,
      reader: users.fullName,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .innerJoin(users, eq(users.id, borrowRecords.userId))
    .where(eq(borrowRecords.status, "BORROWED"))
    .orderBy(desc(borrowRecords.borrowDate))
    .limit(limit);
}

export async function pendingAccountRequests(limit = 6) {
  return db
    .select({
      id: users.id,
      name: users.fullName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(desc(users.createdAt))
    .limit(limit);
}

export async function recentBooks(limit = 6) {
  return db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      cover: books.coverUrl,
      createdAt: books.createdAt,
      genre: books.genre,
    })
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(limit);
}
