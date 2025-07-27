import { recentBooks } from "@/lib/queries/dashboard";
import Link from "next/link";
import dayjs from "dayjs";

export default async function RecentBooksWidget() {
  const books = await recentBooks();

  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      <Header title="Recently Added Books" href="/admin/books" />
      <Link
        href="/admin/books/new"
        className="border rounded-md flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-700 mt-4"
      >
        <span className="text-xl">+</span>Add New Book
      </Link>

      <ul className="space-y-4 mt-6">
        {books.map((b) => (
          <li key={b.id} className="flex gap-3 items-start">
            <img
              src={b.cover}
              alt=""
              className="w-12 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium leading-snug">{b.title}</p>
              <p className="text-xs text-gray-500">
                By {b.author} • {b.genre}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {dayjs(b.createdAt).format("DD/MM/YY")}
              </p>
            </div>
          </li>
        ))}
      </ul>
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
