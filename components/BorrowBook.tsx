"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

// Borrow book frontend logic
const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  // loading state
  const [borrowing, setBorrowing] = useState(false);

  // if not eligible
  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
      });
      return;
    }
    //if not return, start loading
    setBorrowing(true);

    try {
      // call the backend function by passing the params
      const result = await borrowBook({ bookId, userId });

      // handling error and success
      if (result.success) {
        toast.success("Success", {
          description: "Book borrowed successfully",
        });
      } else {
        toast.error("Error", {
          description: result.error,
        });
      }
    } catch {
      toast.error("Error", {
        description: "An error occurred while borrowing the book",
      });
    } finally {
      setBorrowing(false);
    }
  };

  const triggerButton = (
    // Borrowing Button
    <Button
      className="mt-4 min-h-14 w-fit text-blue-950 bg-amber-100 hover:bg-amber-200 hover:text-blue-900 max-md:w-full !important"
      disabled={borrowing}
      type="button"
    >
      {/* book image */}
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      {/* change the btn text according to the current status */}
      <p className="font-bebas-neue text-xl">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );

  return (
    <ConfirmDialog
      trigger={triggerButton}
      title="Confirm Borrow"
      description="Do you really want to borrow this book?"
      confirmText="Yes, Borrow"
      cancelText="Cancel"
      onConfirm={handleBorrowBook}
    />
  );
};
export default BorrowBook;
