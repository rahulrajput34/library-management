import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";

// params is a promise used for fetching the id from the url
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Get the id and convert it to a string
  const id = (await params).id;

  // Get the user session
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  // If the book does not exist, redirect to 404 page
  if (!bookDetails) redirect("/404");

  return (
    <>
      {/* Book overview section */}
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      {/* Video and summary section */}
      <div className="lg:mt-36 mt-16 mb-20 flex flex-col gap-16 lg:flex-row">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3 className="text-xl font-semibold text-blue-950">Summary</h3>

            <div className="space-y-5 text-xl text-gray-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Page;
