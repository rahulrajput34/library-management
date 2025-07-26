"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BORROW_STATUS_ENUM } from "@/database/schema";
import { updateBorrowStatus } from "@/lib/admin/actions/borrowRequests";
import { useOptimistic, useTransition } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const colors: Record<(typeof BORROW_STATUS_ENUM.enumValues)[number], string> = {
  BORROWED: "bg-violet-100 text-violet-700",
  RETURNED: "bg-sky-100 text-sky-700",
  // manual late‑return
  "LATE RETURN": "bg-rose-100 text-rose-700",
} as any;

export function SelectStatus(props: {
  id: string;
  initial: (typeof BORROW_STATUS_ENUM.enumValues)[number];
}) {
  const [state, setState] = useOptimistic(props.initial);
  const [pending, start] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={pending}
          className={`px-2 py-1 rounded-full text-xs font-medium ${colors[state]}`}
        >
          {state.replace("_", " ")}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {BORROW_STATUS_ENUM.enumValues.map((s) => (
          <DropdownMenuItem
            key={s}
            onSelect={() =>
              start(async () => {
                setState(s);
                await updateBorrowStatus({ id: props.id, status: s });
              })
            }
          >
            {s.replace("_", " ")}
            {s === state && (
              <Icon icon="uil:check" className="ml-auto h-4 w-4 text-brand" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
