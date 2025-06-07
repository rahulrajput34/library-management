import React from "react";
import Link from "next/link";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => {
  return (
    <li
      className={cn(
        "flex flex-col",
        isLoanedBook ? "xs:w-52 w-full" : "shrink-0 w-28 sm:w-32 md:w-40"
      )}
    >
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "flex flex-col items-center w-full")}
      >
        <BookCover coverColor={color} coverImage={cover} />

        <p className="mt-4 text-sm leading-tight font-medium text-light-100 line-clamp-2 text-center">
          {title}
        </p>
        <p className="mt-1 text-xs italic text-zinc-400">{genre}</p>

        {isLoanedBook && (
          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center gap-2 text-xs text-light-100">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <span>11 days left to return</span>
            </div>

            <Button className="w-full">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
