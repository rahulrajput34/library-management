"use server";

import { db } from "@/database/drizzle";
import { users, ROLE_ENUM } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/** Update a user's role and revalidate the users page */
export async function updateUserRole(props: {
  userId: string;
  role: (typeof ROLE_ENUM.enumValues)[number];
}) {
  await db
    .update(users)
    .set({ role: props.role })
    .where(eq(users.id, props.userId));
  // refresh admin users cache
  revalidatePath("/admin/users");
}

/** Delete a user and revalidate the users page */
export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
  // refresh admin users cache
  revalidatePath("/admin/users");
}
