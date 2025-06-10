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

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

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

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  return (
    <div className="w-full space-y-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-white">
        {isSignIn
          ? "Welcome Back to the BookWise"
          : "Create Your Library Account"}
      </h2>

      <p className="text-sm leading-relaxed text-gray-400">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              control={form.control}
              name={field as Path<T>}
              key={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-200 capitalize">
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
                        className="h-12 w-full rounded-md bg-[#1B1E2E] px-4 text-sm text-white placeholder:text-gray-500 border border-transparent focus:border-[#F0D9B1] focus:ring-2 focus:ring-[#F0D9B1] focus:outline-none"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="h-12 w-full rounded-md bg-[#F0D9B1] text-[#04070F] font-semibold hover:bg-[#e4cfa6]"
          >
            {isSignIn ? "Login" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-400">
        {isSignIn
          ? "Don’t have an account already? "
          : "Have an account already? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-[#F0D9B1] font-bold"
        >
          {isSignIn ? "Register here" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
