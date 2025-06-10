"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { FIELD_NAMES } from "@/app/constants";
import { FIELD_TYPES } from "@/app/constants";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "./ImageUpload";

// Import the schemas from your validation files
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

// Define the form schema type
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {};

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">
        {isSignIn ? "Welcome Back!" : "Create an Account"}
      </h1>
      <p className="text-center text-muted-foreground">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              control={form.control}
              name={field as Path<T>}
              key={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="w-full"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p
        className="
        text-center text-sm text-muted-foreground mt-4
      "
      >
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-blue-500 font-bold hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
