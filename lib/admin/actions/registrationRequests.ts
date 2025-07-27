"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { AccountApproved } from "@/lib/email/AccountApproved";
import { AccountRejected } from "@/lib/email/AccountRejected";

/** Approve user and send confirmation */
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

/** Reject user and send notification */
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
