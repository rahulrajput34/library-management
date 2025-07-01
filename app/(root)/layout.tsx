import { auth } from "@/auth";
import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";

const layout = async ({ children }: { children: ReactNode }) => {
  // if no session redirect to sign in page
  const session = await auth();
  if (!session) redirect("/sign-in");

  // if user come again on website. just  changing the lastActivityDate to the current date
  // after is called when the page is loaded
  after(async () => {
    // if session is not found return
    if (!session?.user?.id) return;

    // get the user from the database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    // slice only gets date, year and month... Not the time...
    // check if the lastActivityDate is today
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    // update the column lastActivityDate to the current date
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Header session={session} />
        <div className="mt-6 pb-10">{children}</div>
      </div>
    </main>
  );
};

export default layout;
