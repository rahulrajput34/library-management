"use client";

import { RegRow } from "@/lib/queries/registrationRequests";
import { AvatarCircle } from "./AvatarCircle";
import ApproveDialog from "./ApproveDialog";
import RejectDialog from "./RejectDialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ikUrl } from "@/lib/utils";

// Render a table row for a single registration request
export function Row({ row }: { row: RegRow }) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-3">
        {/* Avatar and user details */}
        <div className="flex items-center gap-3">
          <AvatarCircle name={row.fullName} />
          <div className="flex flex-col">
            <span className="font-medium">{row.fullName}</span>
            <span className="text-sm text-gray-500">{row.email}</span>
          </div>
        </div>
      </td>
      <td className="py-3">
        {/* Registration date or placeholder */}
        {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
      </td>
      <td className="py-3">
        {/* University ID value */}
        {row.universityId}
      </td>
      <td className="py-3">
        {/* Link to view the uploaded ID card */}
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
        {/* Action buttons: approve or reject the account */}
        <ApproveDialog userId={row.id} />
        <RejectDialog userId={row.id} />
      </td>
    </tr>
  );
}
