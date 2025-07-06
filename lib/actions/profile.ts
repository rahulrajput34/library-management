"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email(),
  universityId: z
    .number({ invalid_type_error: "University ID must be a number" })
    .int(),
  universityCard: z.string().min(1),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
});

export async function updateProfile(previousState: any, formData: FormData) {
  // Validate
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    universityId: Number(formData.get("universityId")),
    universityCard: formData.get("universityCard"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Get current user
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, errors: { _form: ["Not authenticated"] } };
  }

  const { password, ...rest } = parsed.data;

  // Build update object
  const update: Record<string, any> = { ...rest };

  if (password && password.length) {
    update.password = await bcrypt.hash(password, 10);
  }

  // Execute & handle unique-constraint errors
  try {
    await db.update(users).set(update).where(eq(users.id, session.user.id));

    // refresh the page data
    revalidatePath("/my-profile");
    return { ok: true };
  } catch (e: any) {
    if (e.code === "23505") {
      // Postgres unique_violation
      return {
        ok: false,
        errors: { email: ["Email or University-ID already taken"] },
      };
    }
    throw e;
  }
}
