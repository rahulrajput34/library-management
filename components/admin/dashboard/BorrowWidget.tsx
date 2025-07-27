import { pendingBorrowRequests } from "@/lib/queries/dashboard";
import EmptyState from "./EmptyState";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import dayjs from "dayjs";

export default async function BorrowWidget() {
  // Fetch pending borrow requests
  const requests = await pendingBorrowRequests();

  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      {/* Header with title and link to full borrow requests page */}
      <Header title="Borrow Requests" href="/admin/borrow-requests" />

      {requests.length === 0 ? (
        // Show placeholder when there are no pending requests
        <EmptyState
          title="No Pending Book Requests"
          subtitle="There are no borrow book requests awaiting your review at this time."
        />
      ) : (
        // List each pending borrow request
        <ul className="space-y-3 mt-4">
          {requests.map((r) => (
            <li key={r.id} className="flex gap-3 items-start">
              {/* Book cover thumbnail */}
              <img
                src={r.cover}
                alt=""
                className="w-14 h-20 object-cover rounded shrink-0"
              />
              <div className="flex-1">
                {/* Book title */}
                <p className="font-medium leading-snug">{r.title}</p>
                {/* Book author */}
                <p className="text-xs text-gray-500">{r.author}</p>
                {/* Borrow date with icon */}
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Icon icon="uil:schedule" />
                  {dayjs(r.borrowDate).format("DD/MM/YY")}
                </p>
              </div>
              {/* View details icon */}
              <Icon icon="uil:eye" className="text-gray-400" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Header({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      {/* Widget title */}
      <h3 className="font-semibold">{title}</h3>
      {/* Link to view all borrow requests */}
      <Link
        href={href}
        className="text-xs text-sky-600 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}
