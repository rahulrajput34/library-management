"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BorrowSortSelect(props: {
  sort: "asc" | "desc";
  q?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  function handle(value: "asc" | "desc") {
    const qs = new URLSearchParams(params);
    qs.set("sort", value);
    qs.delete("page"); // reset pagination
    router.replace(`?${qs.toString()}`);
  }

  return (
    <select
      defaultValue={props.sort}
      onChange={(e) => handle(e.currentTarget.value as "asc" | "desc")}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="desc">Recent → Oldest</option>
      <option value="asc">Oldest → Recent</option>
    </select>
  );
}
