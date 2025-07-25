import { listUsers, PAGE } from "@/lib/queries/users";
import { UserRow } from "./Row";
import { Pagination } from "../../ui/pagination";

export default async function UserTable({
  page,
  q,
}: {
  page: number;
  q?: string;
}) {
  const { data, total } = await listUsers({ page, q });
  return (
    <section className="bg-white dark:bg-neutral-800 shadow-sm border border-gray-200 dark:border-neutral-700 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>
      {/* Search bar */}
      <form className="mb-4">
        <input
          defaultValue={q}
          type="text"
          name="q"
          placeholder="Search name or email…"
          className="border px-3 py-2 rounded w-56"
        />
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Date Joined</th>
              <th className="text-left py-2">Role</th>
              <th className="py-2 w-28">Books Borrowed</th>
              <th className="py-2">University ID No</th>
              <th className="py-2">University ID Card</th>
              <th className="py-2 w-12">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination total={total} page={page} pageSize={PAGE} />
    </section>
  );
}
