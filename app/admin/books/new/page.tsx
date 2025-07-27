import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <>
      {/* Navigate back to the books list */}
      <Button
        asChild
        className="mb-10 w-fit border border-gray-50 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 !important"
      >
        <Link href="/admin/books">Go Back</Link>
      </Button>

      {/* Render the form for creating a new book */}
      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default Page;
