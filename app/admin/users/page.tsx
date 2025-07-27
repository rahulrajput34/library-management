import { redirect } from "next/navigation";
import UserTable from "@/components/admin/users/UserTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number(searchParams.page ?? 1);
  if (!Number.isFinite(page) || page < 1) redirect("/admin/users");
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;

  return (
    <div className="mt-7 w-full overflow-x-auto">
      <UserTable page={page} q={q} />
    </div>
  );
}
