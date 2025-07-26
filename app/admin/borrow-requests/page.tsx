import { redirect } from "next/navigation";
import Table from "@/components/admin/borrow-requests/Table";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number(searchParams.page ?? 1);
  if (!Number.isFinite(page) || page < 1) redirect("/admin/borrow-requests");

  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;

  const sort = searchParams.sort === "asc" ? "asc" : "desc";

  return (
    <div className="p-8">
      <Table page={page} q={q} sort={sort} />
    </div>
  );
}
