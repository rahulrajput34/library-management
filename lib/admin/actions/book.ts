"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";

// create book with data we get it from the from
export const createBook = async (params: BookParams) => {
  try {
    // inserting the book into the database
    const newBook = await db
      .insert(books)
      .values({
        ...params, // spreading the params object for the book data
        availableCopies: params.totalCopies,
      })
      .returning();

    // success
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
