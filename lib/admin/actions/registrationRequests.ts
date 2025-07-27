"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// These functions already send the email
import { AccountApproved } from "@/lib/email/AccountApproved";
import { AccountRejected } from "@/lib/email/AccountRejected";

/**
 * Approve a pending user:
 *   1. sets status = "APPROVED"
 *   2. sends confirmation email
 *   3. revalidates the admin list
 */
export async function approveUser(userId: string) {
  const [user] = await db
    .update(users)
    .set({ status: "APPROVED" })
    .where(eq(users.id, userId))
    .returning();

  if (!user) return;

  await AccountApproved(user.email, user.fullName);

  revalidatePath("/admin/registration-requests");
}

/**
 * Reject a pending user:
 *   1. sets status = "REJECTED"
 *   2. sends rejection email
 *   3. revalidates the admin list
 */
export async function rejectUser(userId: string) {
  const [user] = await db
    .update(users)
    .set({ status: "REJECTED" })
    .where(eq(users.id, userId))
    .returning();

  if (!user) return;

  await AccountRejected(user.email, user.fullName);

  revalidatePath("/admin/registration-requests");
}
