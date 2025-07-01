"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

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
        router.push("/");
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

  return (
    // Borrowing Button
    <Button
      className="mt-4 min-h-14 w-fit bg-blue-900 text-dark-100 hover:bg-blue-900/90 max-md:w-full !important"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      {/* book icon */}
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      {/* change the btn text according to the current status */}
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};
export default BorrowBook;
