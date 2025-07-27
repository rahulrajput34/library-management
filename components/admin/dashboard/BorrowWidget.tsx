import { pendingBorrowRequests } from "@/lib/queries/dashboard";
import EmptyState from "./EmptyState";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import dayjs from "dayjs";

export default async function BorrowWidget() {
  const requests = await pendingBorrowRequests();

  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      <Header title="Borrow Requests" href="/admin/borrow-requests" />
      {requests.length === 0 ? (
        <EmptyState
          title="No Pending Book Requests"
          subtitle="There are no borrow book requests awaiting your review at this time."
        />
      ) : (
        <ul className="space-y-3 mt-4">
          {requests.map((r) => (
            <li key={r.id} className="flex gap-3 items-start">
              <img
                src={r.cover}
                alt=""
                className="w-14 h-20 object-cover rounded shrink-0"
              />
              <div className="flex-1">
                <p className="font-medium leading-snug">{r.title}</p>
                <p className="text-xs text-gray-500">{r.author}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Icon icon="uil:schedule" />
                  {dayjs(r.borrowDate).format("DD/MM/YY")}
                </p>
              </div>
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
