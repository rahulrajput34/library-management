import Header from "@/components/Header";
import React, { ReactNode } from "react";

// Main layout component for the application
function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 pb-20 bg-black">
      <div className="mx-auto max-w-7xl">
        <Header/>
        <div className="mt-8 flex flex-col items-center justify-center gap-8">
          {children}
        </div>
      </div>
    </main>
  );
}

export default layout;
