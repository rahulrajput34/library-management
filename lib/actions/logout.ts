"use server";
import { signOut } from "@/auth";

// logoutAction
export async function logoutAction() {
  await signOut();
}
