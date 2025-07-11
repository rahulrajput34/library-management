import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  // if the user has less than 1 book, don't show anything
  if (books.length < 1) return null;

  return (
    <section className={containerClassName}>
      <h2 className="mb-6 font-mono text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="grid gap-y-16 gap-x-12 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] place-items-start">
        {books.map((book) => (
          <BookCard key={book.id ?? book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
