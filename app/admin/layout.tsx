import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  // get the session for the user
  const session = await auth();

  // if the user is not logged in, redirect to the sign-in page
  if (!session?.user?.id) redirect("/sign-in");

  // check if the user role is admin for admin page
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");
  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-gray-50 p-5 xs:p-10">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};
export default Layout;
