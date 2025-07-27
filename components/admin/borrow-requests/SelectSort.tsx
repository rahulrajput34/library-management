"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SelectSort(props: {
  sort: "asc" | "desc";
  q?: string;
}) {
  // initialize router for URL updates
  const router = useRouter();
  // read current query parameters
  const params = useSearchParams();

  // update sort param, reset page, and replace URL
  function handleChange(value: "asc" | "desc") {
    const qs = new URLSearchParams(params);
    qs.set("sort", value);
    qs.delete("page");
    router.replace(`?${qs.toString()}`);
  }

  // render sort order dropdown
  return (
    <select
      defaultValue={props.sort}
      onChange={(e) => handleChange(e.currentTarget.value as "asc" | "desc")}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="desc">Recent → Oldest</option>
      <option value="asc">Oldest → Recent</option>
    </select>
  );
}
