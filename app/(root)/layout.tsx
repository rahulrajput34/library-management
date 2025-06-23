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
    <main className="min-h-screen bg-[#0a1424] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0d1d35] via-[#0c182d] to-[#091221] text-gray-300 antialiased">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
