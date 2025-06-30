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

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
      });
      return;
    }
    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

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
    <Button
      className="mt-4 min-h-14 w-fit bg-blue-900 text-dark-100 hover:bg-blue-900/90 max-md:w-full !important"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};
export default BorrowBook;
