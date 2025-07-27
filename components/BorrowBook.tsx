"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import ConfirmDialog from "./radix/ConfirmDialog";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    status: "APPROVED" | "PENDING" | "REJECTED";
    message: string;
  };
}

export default function BorrowBook({
  userId,
  bookId,
  borrowingEligibility: { status, message },
}: Props) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  async function handleBorrow() {
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Book borrowed successfully");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred while borrowing the book");
    } finally {
      setBorrowing(false);
    }
  }

  const trigger = (
    <Button
      className="mt-4 min-h-14 w-fit text-blue-950 bg-amber-100 hover:bg-amber-200 hover:text-blue-900 max-md:w-full"
      disabled={borrowing}
      type="button"
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl">
        {borrowing ? "Borrowing …" : "Borrow Book"}
      </p>
    </Button>
  );

  /* APPROVED → normal confirm flow */
  if (status === "APPROVED") {
    return (
      <ConfirmDialog
        trigger={trigger}
        title="Confirm Borrow"
        description="Do you really want to borrow this book?"
        confirmText="Yes, Borrow"
        cancelText="Cancel"
        onConfirm={handleBorrow}
      />
    );
  }

  /* PENDING / REJECTED → info dialog with tailored title */
  const title =
    status === "PENDING" ? "Borrowing under review" : "Borrowing denied";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription style={{ whiteSpace: "pre-line" }}>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button variant="secondary">Okay</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
