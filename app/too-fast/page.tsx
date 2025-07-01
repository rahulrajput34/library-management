import React from "react";

const page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-pattern bg-cover bg-top bg-gray-500 px-5 xs:px-10 md:px-16 items-center justify-center bg-gray-950">
      <h1 className="font-bebas-neue text-5xl font-bold text-gray-100">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-gray-100">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly
      </p>
    </main>
  );
};

export default page;