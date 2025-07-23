"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: LoanedBook[];
  loaned?: boolean;
}

const BookBorrowed = ({ title, books }: Props) => {
  const hasBooks = books.length > 0;
  return (
    <section>
      <h2 className="mb-6 font-mono text-3xl font-semibold">{title}</h2>

      {/* If there are books, render a list of them */}
      {hasBooks ? (
        <ul className="grid gap-12 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
          {books.map((book) => (
            <BookCard key={book.id} {...book} isLoanedBook />
          ))}
        </ul>
      ) : (
        // If there are no books, render a message
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-gradient-to-br from-gray-900/70 via-black to-gray-900/70 p-12 text-center shadow-inner">
          <Icon
            icon="mdi:book-open-page-variant"
            className="h-12 w-12 text-white/40 mb-6"
          />

          <h3 className="text-2xl font-semibold mb-2">No borrowed books yet</h3>

          <p className="max-w-md text-gray-400 mb-6">
            Explore our catalogue and borrow your first book — it will appear
            here automatically.
          </p>

          <Link
            href="/"
            className="rounded-lg bg-emerald-500 px-6 py-2 font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            Browse books
          </Link>
        </div>
      )}
    </section>
  );
};

export default BookBorrowed;
