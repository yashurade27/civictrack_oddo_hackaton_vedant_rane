"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold tracking-wide">
        CivicTrack
      </Link>

      <div className="space-x-4">
        <Button variant="outline" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/report">Report Issue</Link>
        </Button>
      </div>
    </nav>
  );
}
