import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, books, borrowRecords } from "@/database/schema";
import { eq, asc } from "drizzle-orm";
import BookList from "@/components/BookList";
import ProfilePage from "@/components/profile/ProfilePage";

export default async function MyProfilePage() {
  // session from imported auth
  const session = await auth();
  if (!session?.user?.id) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  // get my details
  const [me] = await db
    .select({
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  // borrowed books of that user and their status
  const borrowedBooks = await db
    .select({
      // book fields
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
      // loan fields
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
    })
    .from(books)
    .innerJoin(borrowRecords, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id))
    .orderBy(asc(borrowRecords.borrowDate))
    .limit(10);

  return (
    <main className="min-h-screen text-gray-100 p-8">
      {/* profile page with borrowed books */}
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[420px_1fr]">
        <ProfilePage initial={me} />
        <BookList title="Borrowed books" books={borrowedBooks} loaned={true} />
      </div>
    </main>
  );
}
