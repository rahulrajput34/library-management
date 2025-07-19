"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-white text-[#172B4D] border-l-[6px] border-[#36B37E] rounded shadow-md",
          title: "font-semibold",
          description: "opacity-80",
          closeButton: "text-[#42526E] hover:text-[#172B4D]",
        },
      }}
    />
  );
};

export { Toaster };
