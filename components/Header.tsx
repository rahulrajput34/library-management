"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials, getFirstName } from "@/lib/utils";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Icon } from "@iconify/react";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="mb-12 flex items-center justify-between">
      <Link href="/">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={42}
          height={42}
          className="object-contain"
        />
      </Link>
      <div className="flex items-center gap-4">
        <nav>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-gray-100",
              pathname === "/library" ? "text-gray-100" : "text-gray-400"
            )}
          >
            Home
          </Link>
        </nav>
        <nav>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-gray-100",
              pathname === "/library" ? "text-gray-100" : "text-gray-400"
            )}
          >
            Search
          </Link>
        </nav>
        <nav>
          <Link href="/my-profile" className="text-sm font-medium">
            <Avatar>
              <AvatarFallback className="bg-amber-100 border-2 border-blue-500 rounded-4xl p-1 text-gray-950">
                {getInitials(session.user?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium ml-1 text-gray-100">
              {getFirstName(session.user?.name ?? "")}
            </span>
          </Link>
        </nav>
        <nav>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-red-700",
              pathname === "/library" ? "text-red-800" : "text-red-800"
            )}
          >
            <Icon
              icon="material-symbols:logout-rounded"
              width="24"
              height="24"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
