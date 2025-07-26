import { listBooks, PAGE as PAGE_SIZE } from "@/lib/queries/books";
import BooksTable from "@/components/admin/BooksTable";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SearchParams = { page?: string; q?: string };

// display all books in admin page
export default async function BooksAdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  //  page number and query string
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const q = (searchParams.q ?? "").trim();

  const { data: books, total } = await listBooks({ page, q });

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        {/* search bar */}
        <form method="get" className="flex items-center gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search…"
            defaultValue={q}
            className="rounded border px-2 py-1 text-sm"
          />
          {/* always reset to page 1 after a new search */}
          <input type="hidden" name="page" value="1" />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        <Button asChild className="bg-blue-900 text-white">
          <Link href="/admin/books/new">+ Create a New Book</Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-x-auto">
        <BooksTable books={books} />

        {/* keep the search term in the pagination links */}
        <Pagination total={total} page={page} pageSize={PAGE_SIZE} />
      </div>
    </section>
  );
}
