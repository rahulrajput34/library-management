import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, eq, ne } from "drizzle-orm";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import BookCard from "@/components/BookCard";

// page for a selected book
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // current book
  const id = (await params).id;
  const session = await auth();

  // current book details
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  // current book details not found
  if (!bookDetails) redirect("/404");

  // genre-based recommendations
  const similarBooks = await db
    .select()
    .from(books)
    .where(and(eq(books.genre, bookDetails.genre), ne(books.id, id)))
    .limit(6);

  return (
    <main className="min-h-screen px-4 pb-28 text-gray-100 lg:px-8">
      {/* book overview */}
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      {/* video + summary  |||  similar-books */}
      <div className="mt-20 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
        {/* left column */}
        <section className="space-y-16">
          {/* video */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </div>
          {/* summary */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Summary</h3>
            <div className="space-y-5 text-lg leading-relaxed">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        {/* right column */}
        {/* similar-books */}
        <aside>
          <h3 className="mb-6 text-2xl font-semibold">More similar books</h3>
          <ul className="grid gap-8 [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))]">
            {similarBooks.map((b) => (
              <BookCard key={b.id} {...b} />
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default Page;
