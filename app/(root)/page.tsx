import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "../constants";

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Popular Books"
        books={sampleBooks.slice(1, 8)}
        containerClassName="mt-20"
      />
    </>
  );
}
