import { listBorrowRequests, PAGE } from "@/lib/queries/borrowRequests";
import { Pagination } from "@/components/ui/pagination";
import { Row } from "./Row";
import SelectSort from "./SelectSort";

export default async function Table(props: {
  page: number;
  q?: string;
  sort: "asc" | "desc";
}) {
  // Fetch borrow requests and total count based on pagination, search, and sort
  const { data, total } = await listBorrowRequests(props);

  return (
    // Main container with styling
    <section className="bg-white dark:bg-neutral-800 shadow-sm border border-gray-200 dark:border-neutral-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {/* Table title */}
        <h2 className="text-lg font-semibold">Borrow Book Requests</h2>
        {/* Sort dropdown */}
        <SelectSort sort={props.sort} q={props.q} />
      </div>

      {/* Search input */}
      <form className="mb-4">
        <input
          defaultValue={props.q}
          name="q"
          placeholder="Search book or user…"
          className="border px-3 py-2 rounded w-56"
        />
      </form>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Table headers */}
          <thead className="text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left py-2">Book</th>
              <th className="text-left py-2">User Requested</th>
              <th className="text-left py-2">Status</th>
              <th className="py-2">Borrowed date</th>
              <th className="py-2">Return date</th>
              <th className="py-2">Due Date</th>
              <th className="py-2">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each request row */}
            {data.map((r) => (
              <Row key={r.id} row={r} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination total={total} page={props.page} pageSize={PAGE} />
    </section>
  );
}
