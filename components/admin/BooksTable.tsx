"use client";

import { deleteBook } from "@/lib/admin/actions/books";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import ConfirmDialog from "../radix/ConfirmDialog";
import BookCover from "../BookCover";

type Props = { books: Book[] };

export default function BooksTable({ books }: Props) {
  const router = useRouter();

  // Delete a book by its ID, show toast on success, then refresh the page
  const handleDelete = async (id: string) => {
    const res = await deleteBook(id);
    if (res.success) toast.success("Book deleted.");
    router.refresh();
  };

  return (
    // Table layout for listing books
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50 text-left font-semibold">
        <tr>
          <th className="p-3">Title</th>
          <th className="p-3">Author</th>
          <th className="p-3">Genre</th>
          <th className="p-3">Rating</th>
          <th className="p-3 whitespace-nowrap">Date Created</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {books.map((b) => (
          // Single book row
          <tr key={b.id} className="border-b last:border-b-0">
            {/* Book details columns */}
            <td className="p-3 font-medium">
              <div className="flex items-center gap-3">
                <BookCover
                  coverColor={b.coverColor}
                  coverImage={b.coverUrl}
                  variant="xs"
                />
                <span className="font-medium"> {b.title}</span>
              </div>
            </td>
            <td className="p-3">{b.author}</td>
            <td className="p-3">{b.genre}</td>
            <td className="p-3">{b.rating}/5</td>
            <td className="p-3">{b.createdAt?.toLocaleDateString()}</td>
            <td className="p-3">
              <div className="flex gap-3">
                {/* Edit button linking to the edit page */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <a href={`/admin/books/${b.id}/edit`}>
                    <Icon icon="mdi:pencil" width={18} />
                  </a>
                </Button>

                {/* Delete button wrapped in confirmation dialog */}
                <ConfirmDialog
                  trigger={
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Icon icon="mdi:trash-can" width={18} />
                    </Button>
                  }
                  title="Delete book?"
                  description="This action cannot be undone."
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => handleDelete(b.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
