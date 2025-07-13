"use client";

import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";

interface BookCardProps extends LoanedBook {
  isLoanedBook?: boolean;
}

// BookCard component for displaying book details and cover image.
const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  borrowDate,
  dueDate,
  returnDate,
  status,
}) => {
  // If this is NOT a loaned book, or dates are missing, show only cover/title/genre
  if (!isLoanedBook || !borrowDate || !dueDate) {
    return (
      <li className="mx-auto group rounded-3xl p-4 backdrop-blur-lg shadow-lg w-36">
        <Link href={`/books/${id}`} className="block">
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
          <p className="mt-4 text-sm font-medium text-gray-100 text-center line-clamp-2">
            {title}
          </p>
          <p className="mt-1 text-xs italic text-zinc-400 text-center">
            {genre}
          </p>
        </Link>
      </li>
    );
  }

  // Otherwise compute loan metrics
  const now = new Date();
  const borrowed = new Date(borrowDate);
  const due = new Date(dueDate);

  const diffMs = due.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const isOverdue = status === "BORROWED" && daysLeft < 0;

  const totalLoanMs = due.getTime() - borrowed.getTime();
  const usedMs = now.getTime() - borrowed.getTime();
  const progress = Math.min(Math.max(usedMs / totalLoanMs, 0), 1);

  return (
    <li className="mx-auto group rounded-3xl p-4 backdrop-blur-lg shadow-lg max-w-[240px]">
      <Link href={`/books/${id}`} className="flex flex-col items-center">
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <p className="mt-4 text-sm font-medium text-gray-100 text-center line-clamp-2">
          {title}
        </p>
        <p className="mt-1 text-xs italic text-zinc-400 text-center">{genre}</p>

        <div className="mt-4 w-full space-y-2 text-center">
          {/* Borrow date */}
          <p className="text-xs text-gray-100">
            Borrowed on {borrowed.toLocaleDateString()}
          </p>

          {/* Status / Overdue / Days left */}
          {status === "RETURNED" ? (
            <p className="text-xs text-green-400">
              Returned on {new Date(returnDate!).toLocaleDateString()}
            </p>
          ) : isOverdue ? (
            <p className="text-xs text-red-400">
              Overdue by {Math.abs(daysLeft)} day
              {Math.abs(daysLeft) !== 1 && "s"}
            </p>
          ) : (
            <p className="text-xs text-gray-100">
              {daysLeft} day{daysLeft !== 1 && "s"} left to return
            </p>
          )}

          {/* Progress bar */}
          <progress className="w-full h-2 rounded" value={progress} max={1} />
        </div>
      </Link>
    </li>
  );
};

export default BookCard;
