"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

interface Book {
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  cover: string;
  color: string;
}

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  cover,
  color,
}: Book) => (
  <section className="relative grid gap-12 rounded-xl bg-gradient-to-br from-[#0e2038] to-[#0b1628] p-10 text-gray-100 shadow-lg lg:grid-cols-2">
    {/* left column */}
    <div className="flex flex-col gap-5">
      <h1 className="font-bebas-neue text-5xl leading-none">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
        <p>
          By <span className="font-semibold text-white">{author}</span>
        </p>
        <span className="hidden sm:block">•</span>
        <p>
          Category: <span className="font-semibold text-white">{genre}</span>
        </p>
        <span className="hidden sm:block">•</span>
        <div className="flex items-center gap-1">
          <Image
            src="/icons/star.svg"
            alt="rating"
            width={18}
            height={18}
            className="object-contain"
          />
          <span>{rating.toFixed(1)}/5</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-300">
        <p>
          Total books:{" "}
          <span className="font-semibold text-white">{total_copies}</span>
        </p>
        <p>
          Available:{" "}
          <span className="font-semibold text-white">{available_copies}</span>
        </p>
      </div>

      <p className="max-w-prose text-gray-300">{description}</p>

      <Button className="mt-4 w-fit gap-2 bg-[#10192e] px-6 py-3 font-bebas-neue text-lg hover:bg-[#1c2640]">
        <Image
          src="/icons/book.svg"
          alt=""
          width={18}
          height={18}
          className="object-contain bg-white"
        />
        Borrow Book
      </Button>
    </div>

    {/* right column – cover & reflection */}
    <div className="relative flex items-center justify-center">
      <BookCover coverImage={cover} coverColor={color} />

      {/* blurred reflection */}
      <BookCover
        coverImage={cover}
        coverColor={color}
        className="absolute left-10 top-8 -z-10 rotate-12 opacity-40 blur-[2px]"
      />
    </div>
  </section>
);

export default BookOverview;
