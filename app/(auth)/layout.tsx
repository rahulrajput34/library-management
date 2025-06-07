import React from "react";
import { ReactNode } from "react";
import Image from "next/image";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-light-200 text-dark-100">
      <section className="flex flex-col items-center justify-center w-full max-w-md px-4 py-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-light-100 rounded-full">
          <Image
            src="/icons/logo.svg"
            alt="BookWise Logo"
            width={37}
            height={37}
            className="object-contain"
          />
          <h1>
            <span className="text-2xl font-bold text-dark-100">BookWise</span>
          </h1>
        </div>
        <div>
            {children}
        </div>
      </section>
      <section className="mt-8 text-sm text-gray-500">
        <Image
          src="/images/auth-illustration.png"
            alt="Authentication Illustration"
            width={1000}
            height={1000}
            className="size-full object-cover"
        />
        </section>
    </main>
  );
};

export default layout;
