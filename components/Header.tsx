"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="mb-12 flex items-center justify-between">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={42} height={42} />
      </Link>

      <nav>
        <Link
          href="/library"
          className={cn(
            "text-sm font-medium transition-colors hover:text-gray-100",
            pathname === "/library" ? "text-gray-100" : "text-gray-400"
          )}
        >
          Library
        </Link>
      </nav>
    </header>
  );
};

export default Header;
