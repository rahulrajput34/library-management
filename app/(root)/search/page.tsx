"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { books } from "@/database/schema";
import BookCover from "@/components/BookCover";
import axios from "axios";

// Define structure of books
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
}

// Searching
export default function SearchPage() {
  // Read URL search parameters
  const searchParams = useSearchParams();
  // Router for programmatic navigation
  const router = useRouter();

  //  Extract initial search query and page number
  const initialQuery = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [q, setQ] = useState(initialQuery); // current search query
  const [page, setPage] = useState(initialPage); // current page number
  const [books, setBooks] = useState<Book[]>([]); // fetched books
  const [total, setTotal] = useState(0); // total number of books
  const [loading, setLoading] = useState(false); // loading indicator

  // useEffect hook to fetch books when query or page changes
  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      // Fetch books from API based on query and page
      const { data: json } = await axios.get("/api/books", {
        params: { q, page },
      });

      // Update state with fetched data
      setBooks(json.books);
      setTotal(json.total);
      setLoading(false);
    }

    // params for search query and page number
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    router.replace(`/search?${params.toString()}`, { scroll: false });
    fetchBooks();
  }, [q, page, router]);

  // Handle form submission
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default page reload
    setPage(1); // Reset to first page on new search
  };

  // Searching bar
  const clearSearch = () => {
    setQ("");
    setPage(1);
  };

  // Calculate pagination range
  const pageSize = 12;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="px-4 py-10 max-w-5xl mx-auto">
      {/* Hero / Search bar */}
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-400">DISCOVER YOUR NEXT GREAT READ:</p>
        <h1 className="text-4xl font-bold text-white">
          Explore and Search for{" "}
          <span className="text-amber-300">Any Book In Our Library</span>
        </h1>
        <form onSubmit={onSubmit} className="mt-4 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Icon
              icon="material-symbols:search"
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search books..."
              className="w-full rounded-full bg-gray-800 placeholder-gray-500 pl-12 pr-4 py-3 text-white focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* No results state */}
      {!loading && q && books.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-white text-2xl">
            Search Result for <span className="text-amber-300">{q}</span>
          </p>
          <div className="mx-auto mt-10 w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center">
            <Icon
              icon="carbon:document-error"
              width={80}
              height={80}
              className="text-gray-600"
            />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            No Results Found
          </h2>
          <p className="mt-2 text-gray-400 text-12xl">
            We couldn’t find any books matching your search. <br />
            Try using different keywords or check for typos.
          </p>
          <button
            onClick={clearSearch}
            className="mt-6 px-6 py-2 bg-amber-300 rounded-full font-medium uppercase"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Results grid + pagination */}
      {!loading && (!q || books.length > 0) && (
        <div className="mt-12">
          <h2 className="text-white text-2xl font-semibold mb-6">
            {q ? `Search Results` : "All Books"}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <Link
                href={`/books/${book.id}`}
                key={book.id}
                className="group block space-y-2"
              >
                <div className="">
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                  />
                </div>
                <h3 className="text-white font-medium truncate">
                  {book.title} — By {book.author}
                </h3>
                <p className="text-gray-400 text-sm truncate">{book.genre}</p>
              </Link>
            ))}
          </div>
          {/* pagination */}
          {totalPages > 1 && (
            <nav className="mt-10 flex justify-center items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-full bg-gray-800 disabled:opacity-50"
              >
                <Icon icon="material-symbols:chevron-left-rounded" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    page === i + 1
                      ? "bg-amber-300 text-black"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-full bg-gray-800 disabled:opacity-50"
              >
                <Icon icon="material-symbols:chevron-right-rounded" />
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
