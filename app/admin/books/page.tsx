import { listBooks } from "@/lib/admin/actions/book";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BooksTable from "@/components/admin/BooksTable";

export default async function BooksAdminPage() {
  const books = await listBooks();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        <Button asChild className="bg-blue-900 text-white">
          <Link href="/admin/books/new">+ Create a New Book</Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-x-auto">
        <BooksTable books={books} />
      </div>
    </section>
  );
}
