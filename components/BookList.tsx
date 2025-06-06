import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return null;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-3xl md:text-4xl text-light-100">
        {title}
      </h2>

      <ul className="mt-6 flex flex-nowrap gap-8 md:gap-12 overflow-x-auto pb-2 scrollbar-hide">
        {books.map((book) => (
          <BookCard key={book.id ?? book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
