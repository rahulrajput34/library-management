import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { asc, eq } from "drizzle-orm";
import { borrowBook } from "@/lib/actions/book";

const Page = async () => {
  // get 10 borrowed books
  const borrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(books)
    .innerJoin(borrowRecords, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.status, "BORROWED"))
    .orderBy(asc(borrowRecords.borrowDate))
    .limit(10);

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};
export default Page;
