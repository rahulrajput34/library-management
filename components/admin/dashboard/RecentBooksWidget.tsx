import { recentBooks } from "@/lib/queries/dashboard";
import Link from "next/link";
import dayjs from "dayjs";
import BookCover from "@/components/BookCover";

export default async function RecentBooksWidget() {
  // fetch the most recently added books
  const books = await recentBooks();

  // render the recent books widget
  return (
    <section className="border rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col">
      {/* header with title and link to all books */}
      <Header title="Recently Added Books" href="/admin/books" />

      {/* button to add a new book */}
      <Link
        href="/admin/books/new"
        className="border rounded-md flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-700 mt-4"
      >
        <span className="text-xl">+</span>Add New Book
      </Link>

      {/* list each recent book */}
      <ul className="space-y-4 mt-6">
        {books.map((b) => (
          <li key={b.id} className="flex gap-3 items-start">
            {/* book cover image */}
            <BookCover coverColor={b.color} coverImage={b.cover} variant="sm" />
            <div className="flex-1">
              {/* book title */}
              <p className="font-medium leading-snug">{b.title}</p>
              {/* author and genre */}
              <p className="text-xs text-gray-500">
                By {b.author} • {b.genre}
              </p>
              {/* formatted creation date */}
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

// reusable header for widget sections
function Header({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      {/* widget section title */}
      <h3 className="font-semibold">{title}</h3>
      {/* link to view all items */}
      <Link
        href={href}
        className="text-xs text-sky-600 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}
