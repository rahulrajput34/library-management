"use client";

import { RegRow } from "@/lib/queries/registrationRequests";
import { AvatarCircle } from "./AvatarCircle";
import ApproveDialog from "./ApproveDialog";
import RejectDialog from "./RejectDialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ikUrl } from "@/lib/utils";

export function Row({ row }: { row: RegRow }) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-3">
        <div className="flex items-center gap-3">
          <AvatarCircle name={row.fullName} />
          <div className="flex flex-col">
            <span className="font-medium">{row.fullName}</span>
            <span className="text-sm text-gray-500">{row.email}</span>
          </div>
        </div>
      </td>
      <td className="py-3">
        {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
      </td>
      <td className="py-3">{row.universityId}</td>
      <td className="py-3">
        <a
          href={ikUrl(row.universityCard)}
          target="_blank"
          className="text-sky-600 hover:underline flex items-center gap-1 text-sm"
        >
          <Icon icon="uil:eye" />
          View ID Card
        </a>
      </td>

      <td className="py-3 flex gap-4 items-center">
        <ApproveDialog userId={row.id} />
        <RejectDialog userId={row.id} />
      </td>
    </tr>
  );
}
