"use server";

import { db } from "@/database/drizzle";
import { users, ROLE_ENUM } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateUserRole(props: {
  userId: string;
  role: (typeof ROLE_ENUM.enumValues)[number];
}) {
  await db
    .update(users)
    .set({ role: props.role })
    .where(eq(users.id, props.userId));
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
  revalidatePath("/admin/users");
}
