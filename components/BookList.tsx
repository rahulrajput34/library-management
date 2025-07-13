import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: LoanedBook[];
  loaned?: boolean;
}

const BookList = ({ title, books }: Props) => {
  // if the user has less than 1 book, don't show anything
  if (books.length === 0) return null;

  return (
    <section>
      <h2 className="mb-6 font-mono text-3xl font-semibold">{title}</h2>
      <ul className="grid gap-12 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
        {books.map((book) => (
          <BookCard key={book.id} {...book} isLoanedBook />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
