import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, books, borrowRecords } from "@/database/schema";
import { eq, asc } from "drizzle-orm";
import BookList from "@/components/BookList";
import ProfilePage from "@/components/profile/ProfilePage";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default async function MyProfilePage() {
  // session from imported auth
  const session = await auth();
  if (!session?.user?.id) {
    return <p>Unauthorized</p>;
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

  // borrowed books of that user
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
    <main className="min-h-screen bg-gray-900 text-white p-8">
      {/* profile page with borrowed books */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfilePage initial={me} />
        <BookList title="Borrowed books" books={borrowedBooks} />
      </div>
    </main>
  );
}
