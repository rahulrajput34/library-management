"use client";

import { BorrowRequestRow } from "@/lib/queries/borrowRequests";
import { SelectStatus } from "./SelectStatus";
import { Icon } from "@iconify/react/dist/iconify.js";
import { generateReceipt } from "@/lib/admin/actions/borrowRequests";
import { useState } from "react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import BookCover from "@/components/BookCover";

export function Row({ row }: { row: BorrowRequestRow }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <tr className="border-b last:border-none">
      {/* Book */}
      <td className="py-3">
        <div className="flex items-center gap-3">
          <BookCover
            coverColor={row.bookColor}
            coverImage={row.bookCover}
            variant="xs"
          />
          <span className="font-medium">{row.bookTitle}</span>
        </div>
      </td>

      {/* User */}
      <td className="py-3">
        <div className="flex items-center gap-3">
          <AvatarCircle name={row.userName} />
          <div className="flex flex-col">
            <span className="font-medium">{row.userName}</span>
            <span className="text-sm text-gray-500">{row.userEmail}</span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-3">
        <SelectStatus id={row.id} initial={row.status} />
      </td>

      <td className="py-3">{fmt(row.borrowDate)}</td>
      <td className="py-3">{row.returnDate ? fmt(row.returnDate) : "—"}</td>
      <td className="py-3">{fmt(row.dueDate)}</td>

      {/* Receipt */}
      <td className="py-3">
        {row.status === "RETURNED" ? (
          pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              className="text-sky-600 hover:underline flex items-center gap-1 text-sm"
            >
              View
              <Icon icon="uil:external-link-alt" />
            </a>
          ) : (
            <button
              onClick={async () => setPdfUrl(await generateReceipt(row.id))}
              className="text-sky-600 hover:underline flex items-center gap-1 text-sm"
            >
              <Icon icon="uil:file-download" />
              Generate
            </button>
          )
        ) : (
          <span className="text-gray-400 flex items-center gap-1">
            <Icon icon="uil:file" />
            Generate
          </span>
        )}
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

const fmt = (d: Date | string) => new Date(d).toLocaleDateString();
