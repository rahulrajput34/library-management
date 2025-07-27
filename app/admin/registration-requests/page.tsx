import { redirect } from "next/navigation";
import Table from "@/components/admin/registration-requests/Table";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // parse "page" query param
  const page = Number(searchParams.page ?? 1);
  // redirect on invalid page
  if (!Number.isFinite(page) || page < 1)
    redirect("/admin/registration-requests");

  // use "q" only if it's a string
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  // default "sort" to "desc" unless explicitly "asc"
  const sort = searchParams.sort === "asc" ? "asc" : "desc";

  // render table with pagination, query, and sorting
  return (
    <div className="p-8">
      <Table page={page} q={q} sort={sort} />
    </div>
  );
}
