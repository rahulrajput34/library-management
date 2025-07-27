import { pendingAccountRequests } from "@/lib/queries/dashboard";
import EmptyState from "./EmptyState";
import { AvatarCircle } from "../registration-requests/AvatarCircle";
import Link from "next/link";

export default async function AccountWidget() {
  const accounts = await pendingAccountRequests();

  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      <Header title="Account Requests" href="/admin/registration-requests" />
      {accounts.length === 0 ? (
        <EmptyState
          title="No Pending Account Requests"
          subtitle="There are currently no account requests awaiting approval."
        />
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {accounts.map((a) => (
            <div
              key={a.id}
              className="flex flex-col items-center text-center gap-2"
            >
              <AvatarCircle name={a.name} />
              <p className="text-xs font-medium">{a.name}</p>
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
      <h3 className="font-semibold">{title}</h3>
      <Link
        href={href}
        className="text-xs text-sky-600 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}
