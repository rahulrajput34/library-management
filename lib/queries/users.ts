import { db } from "@/database/drizzle";
import {
  users,
  borrowRecords,
  STATUS_ENUM,
  ROLE_ENUM,
} from "@/database/schema";
import { and, count, desc, eq, ilike, sql as dsql } from "drizzle-orm";

// items per page
export const PAGE = 10;

export type UserWithStats = Awaited<
  ReturnType<typeof listUsers>
>["data"][number];

// returns paginated users with borrow counts and optional search
export async function listUsers(opts: { page: number; q?: string }) {
  const { page, q } = opts;
  // apply ILIKE filter on name/email if q provided
  const where = q
    ? and(ilike(users.fullName, `%${q}%`), ilike(users.email, `%${q}%`))
    : undefined;

  // fetch user rows, join borrowRecords for count, group by user.id
  const data = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,
      universityCard: users.universityCard,
      borrowCount: count(borrowRecords.id).as("borrowCount"),
    })
    .from(users)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
    .where(where)
    .groupBy(users.id)
    .orderBy(desc(users.createdAt))
    .limit(PAGE)
    .offset((page - 1) * PAGE);

  // get total count for pagination
  const { rows } = await db.execute<{ total: number }>(
    dsql`
      SELECT COUNT(*)::int AS total
      FROM ${users}
      ${where ? dsql`WHERE ${where}` : dsql``}
    `
  );
  const total = rows[0]?.total ?? 0;

  return { data, total };
}
