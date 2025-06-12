import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "../constants";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";

const Home = async () => {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks.slice(0, 9)}
        containerClassName="mt-20"
      />
    </>
  );
};

export default Home;
