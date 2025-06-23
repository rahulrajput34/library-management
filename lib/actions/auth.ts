"use server";

import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { success } from "zod/v4";
import { error } from "console";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "@/lib/config";

// SignIn and validation param using same AuthCredentials after picking from it
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  // get ip address
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  // check if the user is rate limited
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  try {
    // we want to sign in with credentials method with passing the email and password
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // if error
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return {
      success: false,
      error: "Signin error",
    };
  }
};

// signUp || validation parameter using the AuthCredentials
export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  // get ip address
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  // check if the user is rate limited
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  // check if the user already exits
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email)) // check if emails same
    .limit(1);

  // if use is there
  if (existingUser.length > 0) {
    return { success: false, error: "User already exits" };
  }

  // if not then hash the password
  const hashedPassword = await hash(password, 10);

  try {
    // add the user in db
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    // trigger the workflow
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    // let use log in as well
    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return {
      success: false,
      error: "Signup error",
    };
  }
};
