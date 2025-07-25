import { notFound } from "next/navigation";
import { getBookById } from "@/lib/admin/actions/books";
import BookForm from "@/components/admin/forms/BookForm";

type Props = { params: { id: string } };

export default async function EditBookPage({ params }: Props) {
  const book = await getBookById(params.id);
  if (!book) notFound();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="mb-6 text-xl font-semibold">Edit Book</h2>
      <BookForm type="update" {...book} />
    </section>
  );
}
