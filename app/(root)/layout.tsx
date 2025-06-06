import Header from "@/components/Header";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0a1424] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0d1d35] via-[#0c182d] to-[#091221] text-gray-300 antialiased">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}

export default layout;
