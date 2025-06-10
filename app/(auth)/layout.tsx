import React from "react";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex w-full min-h-screen bg-[#101828] py-8">
    <section className="flex flex-col justify-center w-full md:max-w-lg lg:max-w-xl px-8 md:px-12 lg:px-16 bg-[#101828]">
      <header className="flex items-center gap-3 mb-10">
        <Image
          src="/icons/logo.svg"
          alt="BookWise Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold text-white">BookWise</h1>
      </header>
      {children}
    </section>

    <section className="relative flex-1 hidden md:block">
      <Image
        src="/images/auth-illustration.png"
        alt="Authentication Illustration"
        fill
        className="object-cover"
      />
    </section>
  </main>
);

export default layout;
