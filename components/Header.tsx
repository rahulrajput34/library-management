"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials, getFirstName } from "@/lib/utils";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Icon } from "@iconify/react";
import { logoutAction } from "@/lib/actions/logout";
import ConfirmDialog from "./radix/ConfirmDialog";

// Header of the main page for users
const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  // ask for permission to logout
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="mb-12 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/icons/logo.svg"
            alt="BookWise Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-white mx-2">BookWise</h1>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {/* Home page */}
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

        {/* Search page */}
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

        {/* user profile page */}
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

        {/* Logout button */}
        <nav>
          <ConfirmDialog
            trigger={
              <button
                type="button"
                className="flex items-center text-sm text-red-600 hover:text-red-400"
              >
                <Icon
                  icon="material-symbols:logout-rounded"
                  width="24"
                  height="24"
                />
              </button>
            }
            title="Do you really want to logout?"
            description="You'll be signed out of your account."
            confirmText="Logout"
            cancelText="Cancel"
            onConfirm={handleLogout}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
