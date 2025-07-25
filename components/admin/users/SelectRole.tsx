"use client";

import { useOptimistic, useTransition } from "react";
import { updateUserRole } from "@/lib/admin/actions/users";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ROLE_ENUM } from "@/database/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export function SelectRole({
  userId,
  initial,
}: {
  userId: string;
  initial: (typeof ROLE_ENUM.enumValues)[number];
}) {
  const [role, setRole] = useOptimistic(initial);
  const [isPending, start] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              role === "ADMIN"
                ? "bg-green-100 text-green-700"
                : "bg-pink-100 text-pink-700"
            }
          `}
          disabled={isPending}
        >
          {role[0] + role.slice(1).toLowerCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {ROLE_ENUM.enumValues.map((r) => (
          <DropdownMenuItem
            key={r}
            onSelect={() =>
              start(async () => {
                setRole(r);
                await updateUserRole({
                  userId,
                  role: r,
                });
              })
            }
          >
            {r[0] + r.slice(1).toLowerCase()}
            {role === r && (
              <Icon icon="uil:check" className="ml-auto h-4 w-4 text-brand" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
