import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { string } from "zod/v4";
import config from "./config";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const getFirstName = (name: string): string =>
  name.trim().split(/\s+/)[0] || "";

const ENDPOINT = config.env.imagekit.urlEndpoint;
export function ikUrl(path: string) {
  return ENDPOINT.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}

export async function generateReceiptPdf(data: {
  receiptId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const draw = (text: string, y: number) =>
    page.drawText(text, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0.95, 0.9, 0.8),
    });

  draw("📖  BookWise", 790);
  draw("Borrow Receipt", 760);
  draw(`Receipt ID: #${data.receiptId.slice(0, 8)}`, 730);
  draw(`Date Issued: ${new Date().toLocaleDateString()}`, 710);

  // …abbreviated – fill as needed …

  return await pdf.save();
}
