"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials, getFirstName } from "@/lib/utils";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Icon } from "@iconify/react";
import { logoutAction } from "@/lib/actions/logout";

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
            href="/search"
            className={cn(
              "text-sm font-medium transition-colors hover:text-gray-100",
              pathname.startsWith("/search") ? "text-gray-100" : "text-gray-400"
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
          <form action={logoutAction}>
            <button type="submit" className="text-red-600 hover:text-red-400">
              <Icon
                icon="material-symbols:logout-rounded"
                width="24"
                height="24"
              />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;
