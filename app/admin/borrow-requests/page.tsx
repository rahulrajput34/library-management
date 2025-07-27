import { redirect } from "next/navigation";
import Table from "@/components/admin/borrow-requests/Table";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Handle page pagination from query, defaulting to 1
  const page = Number(searchParams.page ?? 1);
  // Redirect if page param is invalid
  if (!Number.isFinite(page) || page < 1) redirect("/admin/borrow-requests");

  // Extract optional search query
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  // Set sort direction, default to descending
  const sort = searchParams.sort === "asc" ? "asc" : "desc";

  // Render table with pagination, search, and sort props
  return (
    <div className="p-8">
      <Table page={page} q={q} sort={sort} />
    </div>
  );
}
