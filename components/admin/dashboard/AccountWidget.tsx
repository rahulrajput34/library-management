import { pendingAccountRequests } from "@/lib/queries/dashboard";
import EmptyState from "./EmptyState";
import { AvatarCircle } from "../registration-requests/AvatarCircle";
import Link from "next/link";

export default async function AccountWidget() {
  // Fetch pending account requests from the database
  const accounts = await pendingAccountRequests();

  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      {/* Widget header with title and link to full list */}
      <Header title="Account Requests" href="/admin/registration-requests" />

      {accounts.length === 0 ? (
        // Show placeholder when there are no pending requests
        <EmptyState
          title="No Pending Account Requests"
          subtitle="There are currently no account requests awaiting approval."
        />
      ) : (
        // Display each pending account in a responsive grid
        <div className="grid grid-cols-3 gap-4 mt-4">
          {accounts.map((a) => (
            <div
              key={a.id}
              className="flex flex-col items-center text-center gap-2"
            >
              {/* User avatar */}
              <AvatarCircle name={a.name} />
              {/* User name */}
              <p className="text-xs font-medium">{a.name}</p>
              {/* User email, truncated if too long */}
              <p className="text-[10px] text-gray-500 truncate max-w-[80px]">
                {a.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Header({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      {/* Section title */}
      <h3 className="font-semibold">{title}</h3>
      {/* Link to view all requests */}
      <Link
        href={href}
        className="text-xs text-sky-600 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}
