import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  // if the user has less than 2 books, don't show anything
  if (books.length < 2) return null;

  return (
    <section className={containerClassName}>
      <h2 className="font-mono font-medium text-2xl md:text-4xl text-gray-100">
        {title}
      </h2>

      <ul className="mt-6 flex flex-nowrap gap-8 md:gap-12 overflow-x-auto pb-2 no-scrollbar">
        {books.map((book) => (
          <BookCard key={book.id ?? book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
