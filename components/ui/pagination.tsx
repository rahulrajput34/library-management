import Link from "next/link";

export function Pagination({
  total,
  page,
  pageSize,
}: {
  total: number;
  page: number;
  pageSize: number;
}) {
  const last = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-end gap-4 mt-6">
      <Link
        href={{ query: { page: page - 1 } }}
        className="px-3 py-1 border rounded disabled:opacity-50"
        aria-disabled={page <= 1}
      >
        Previous
      </Link>
      <span className="text-sm">
        Page {page} / {last || 1}
      </span>
      <Link
        href={{ query: { page: page + 1 } }}
        className="px-3 py-1 border rounded disabled:opacity-50"
        aria-disabled={page >= last}
      >
        Next
      </Link>
    </div>
  );
}
