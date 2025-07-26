"use server";

import { db } from "@/database/drizzle";
import { borrowRecords, BORROW_STATUS_ENUM } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateReceiptPdf } from "@/lib/utils";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function updateBorrowStatus(props: {
  id: string;
  status: (typeof BORROW_STATUS_ENUM.enumValues)[number];
}) {
  await db
    .update(borrowRecords)
    .set({ status: props.status })
    .where(eq(borrowRecords.id, props.id));
  revalidatePath("/admin/borrow-requests");
}

export async function generateReceipt(id: string) {
  // fetch row + joins for template
  const [row] = await db
    .select({
      receiptId: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      // book & user
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.id, id))
    .limit(1);

  if (!row) throw new Error("Borrow record not found");

  const pdfBytes = await generateReceiptPdf({
    ...row,
    dueDate: new Date(row.dueDate),
    returnDate: row.returnDate ? new Date(row.returnDate) : null,
  });

  const filename = `${randomUUID()}.pdf`;
  const filePath = join(process.cwd(), "public/receipts", filename);
  await writeFile(filePath, pdfBytes);
  revalidatePath("/admin/borrow-requests");
  return `/receipts/${filename}`;
}
