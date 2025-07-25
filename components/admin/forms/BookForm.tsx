"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { toast } from "sonner";
import ColorPicker from "../ColorPicker";
import { Textarea } from "@/components/ui/textarea";
import { createBook, updateBook } from "@/lib/admin/actions/books";

// give two type
interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type = "create", ...book }: Props) => {
  const router = useRouter();

  // Create a new form using useForm hook
  // and pass the bookSchema as the resolver.
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title ?? "",
      author: book.author ?? "",
      genre: book.genre ?? "",
      rating: book.rating ?? 1,
      totalCopies: book.totalCopies ?? 1,
      coverUrl: book.coverUrl ?? "",
      coverColor: book.coverColor ?? "",
      description: book.description ?? "",
      videoUrl: book.videoUrl ?? "",
      summary: book.summary ?? "",
    },
  });

  // submit handler
  // it will create a new book or update an existing book
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    // try to create new
    const result =
      type === "create"
        ? await createBook(values)
        : await updateBook(book.id as string, values);

    if (result.success) {
      toast("Success", {
        description: "Book created successfully",
      });
      router.push(`/admin/books`);
    } else {
      toast("Error", {
        description: result.message,
      });
    }
  };

  return (
    <Form {...form}>
      {/* form fields*/}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title field */}
        {/* {...field} for update the field value */}
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* author field */}
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book author"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* genre field*/}
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book genre"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* rating field */}
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* total copies field */}
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Total copies"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* cover url field*/}
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  folder="books/covers"
                  variant="white"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* cover color field */}
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  onPickerChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description field */}
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  {...field}
                  rows={10}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* trailer field */}
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="books/videos"
                  variant="white"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* summary field */}
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-gray-700">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="min-h-14 border border-gray-100 bg-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 !important"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* submit button */}
        <Button
          type="submit"
          className="min-h-14 w-full bg-blue-900 hover:bg-blue-900/95 !important text-white"
        >
          {type === "create" ? "Add Book to Library" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
};
export default BookForm;
