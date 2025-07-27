"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BorrowSortSelect(props: {
  sort: "asc" | "desc";
  q?: string;
}) {
  const router = useRouter(); // router for updating URL
  const params = useSearchParams(); // current query params

  // change sort order, reset page, and update URL without reload
  function handle(value: "asc" | "desc") {
    const qs = new URLSearchParams(params);
    qs.set("sort", value);
    qs.delete("page"); // reset pagination to first page
    router.replace(`?${qs.toString()}`);
  }

  // dropdown for selecting sort direction
  return (
    <select
      defaultValue={props.sort} // initial sort from props
      onChange={(e) => handle(e.currentTarget.value as "asc" | "desc")} // handle selection
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="desc">Recent → Oldest</option>
      <option value="asc">Oldest → Recent</option>
    </select>
  );
}
