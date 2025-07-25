"use client";

import { useState } from "react";
import { deleteUser, updateUserRole } from "@/lib/admin/actions/users";
import { Button } from "@/components/ui/button";
import { UserWithStats } from "@/lib/queries/users";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SelectRole } from "./SelectRole";
import { ikUrl } from "@/lib/utils";
import ConfirmDialog from "@/components/radix/ConfirmDialog";

export function UserRow({ user }: { user: UserWithStats }) {
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  return (
    <tr className="border-b last:border-none">
      <td className="py-3">
        <div className="flex items-center gap-3">
          <AvatarCircle name={user.fullName} />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {user.fullName}
            </span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="py-3 text-sm">
        {user.createdAt ? user.createdAt.toLocaleDateString() : "N/A"}
      </td>
      <td className="py-3">
        <SelectRole userId={user.id} initial={user.role ?? "USER"} />
      </td>
      <td className="py-3 text-center">{user.borrowCount}</td>
      <td className="py-3 text-center">{user.universityId}</td>
      <td className="py-3">
        <a
          href={ikUrl(user.universityCard)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline flex items-center gap-1 text-sm"
        >
          View ID Card
          <Icon icon="uil:external-link-alt" />
        </a>
      </td>
      <td className="py-3 text-right">
        <ConfirmDialog
          trigger={
            <button className="text-red-600 hover:text-red-800">
              <Icon icon="uil:trash" className="w-4 h-4" />
            </button>
          }
          title="Delete user"
          description="This action permanently removes the user and all related data. Are you sure?"
          confirmText="Yes, delete"
          cancelText="Cancel"
          onConfirm={() => deleteUser(user.id)}
        />
      </td>
    </tr>
  );
}

function AvatarCircle({ name }: { name: string }) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  return (
    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-200">
      {initials}
    </div>
  );
}
