import { listPendingRegs, PAGE } from "@/lib/queries/registrationRequests";
import { Row } from "./Row";
import { Pagination } from "@/components/ui/pagination";
import BorrowSortSelect from "./BorrowSortSelect";

export default async function Table(props: {
  page: number;
  q?: string;
  sort: "asc" | "desc";
}) {
  // Fetch pending registration requests and total count
  const { data, total } = await listPendingRegs(props);

  return (
    <section className="dark:bg-neutral-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {/* Widget title */}
        <h2 className="text-lg font-semibold">Account Registration Requests</h2>
        {/* Sort control for registration requests */}
        <BorrowSortSelect sort={props.sort} q={props.q} />
      </div>

      {/* Search input for name or email */}
      <form className="mb-4">
        <input
          defaultValue={props.q}
          name="q"
          placeholder="Search name or email…"
          className="border px-3 py-2 rounded w-56"
        />
      </form>

      {/* Table container with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Date Joined</th>
              <th className="py-2">University ID No</th>
              <th className="py-2">University ID Card</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each registration request row */}
            {data.map((u) => (
              <Row key={u.id} row={u} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination total={total} page={props.page} pageSize={PAGE} />
    </section>
  );
}
