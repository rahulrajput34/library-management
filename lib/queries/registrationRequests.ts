import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { and, desc, eq, ilike, or, sql as dsql } from "drizzle-orm";

// items per page
export const PAGE = 10;

export type RegRow = Awaited<
  ReturnType<typeof listPendingRegs>
>["data"][number];

export async function listPendingRegs(opts: {
  page: number;
  q?: string;
  sort: "asc" | "desc";
}) {
  const { page, q, sort } = opts;

  // optional name/email search filter
  const search = q
    ? or(ilike(users.fullName, `%${q}%`), ilike(users.email, `%${q}%`))
    : undefined;

  // paginated query with status filter, search, and sort
  const data = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(and(eq(users.status, "PENDING"), search))
    .orderBy(sort === "asc" ? users.createdAt : desc(users.createdAt))
    .limit(PAGE)
    .offset((page - 1) * PAGE);

  // count total matching rows
  const [{ total }] = (
    await db.execute<{ total: number }>(
      dsql`SELECT COUNT(*)::int AS total FROM ${users}
           WHERE ${eq(users.status, "PENDING")}
           ${search ? dsql`AND ${search}` : dsql``}`
    )
  ).rows;

  return { data, total };
}
