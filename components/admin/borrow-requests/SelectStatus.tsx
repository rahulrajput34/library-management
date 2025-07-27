"use client";

// Map borrow statuses to Tailwind CSS classes
const colors: Record<(typeof BORROW_STATUS_ENUM.enumValues)[number], string> = {
  BORROWED: "bg-violet-100 text-violet-700",
  RETURNED: "bg-sky-100 text-sky-700",
  // manual late‑return
  "LATE RETURN": "bg-rose-100 text-rose-700",
} as any;

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

// Client-side component for selecting and updating borrow status
export function SelectStatus(props: {
  id: string;
  initial: (typeof BORROW_STATUS_ENUM.enumValues)[number];
}) {
  // Optimistic state for current status
  const [state, setState] = useOptimistic(props.initial);
  // Pending state indicator for async update
  const [pending, start] = useTransition();

  // Render dropdown menu to select status
  return (
    <DropdownMenu>
      {/* Trigger button showing current status */}
      <DropdownMenuTrigger asChild>
        <button
          disabled={pending}
          className={`px-2 py-1 rounded-full text-xs font-medium ${colors[state]}`}
        >
          {/* Format status label */}
          {state.replace("_", " ")}
        </button>
      </DropdownMenuTrigger>
      {/* Dropdown items for each status option */}
      <DropdownMenuContent align="start">
        {BORROW_STATUS_ENUM.enumValues.map((s) => (
          <DropdownMenuItem
            key={s}
            onSelect={() =>
              start(async () => {
                // Optimistically update UI
                setState(s);
                // Persist new status to server
                await updateBorrowStatus({ id: props.id, status: s });
              })
            }
          >
            {/* Display option label */}
            {s.replace("_", " ")}
            {/* Show check icon for current status */}
            {s === state && (
              <Icon icon="uil:check" className="ml-auto h-4 w-4 text-brand" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
