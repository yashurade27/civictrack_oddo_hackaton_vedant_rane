"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const showBackButton = pathname === "/createIssue"; // You can add more routes if needed

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        )}
        <Link href="/" className="text-xl font-bold tracking-wide">
          CivicTrack
        </Link>
      </div>

      <div className="space-x-4 flex items-center">
        <SignedIn>
          <Button asChild>
            <Link href="/createIssue">Report Issue</Link>
          </Button>
        </SignedIn>

        <SignedOut>
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
