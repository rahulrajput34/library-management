import React from "react";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import BorrowBook from "@/components/BorrowBook";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  // get the user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  // check if the user is  eligible to get the book or not
  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  return (
    <section className="relative grid gap-12 rounded-xl bg-gradient-to-br from-[#0e2038] to-[#0b1628] p-10 text-gray-100 shadow-lg lg:grid-cols-2">
      {/* Book Info */}
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
            <span>
              {typeof rating === "number" ? rating.toFixed(1) : rating}/5
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
          <p>
            Total books:{" "}
            <span className="font-semibold text-white">{totalCopies}</span>
          </p>
          <p>
            Available:{" "}
            <span className="font-semibold text-white">{availableCopies}</span>
          </p>
        </div>

        <p className="max-w-prose text-gray-300">{description}</p>
        {/* borrow button */}
        {/* passing which are required for the function */}
        {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      {/* CoverUrl & reflection of book cover image */}
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="xl"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="xl"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
