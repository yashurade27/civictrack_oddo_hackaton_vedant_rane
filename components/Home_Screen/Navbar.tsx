import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
         <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-wide">
              CivicTrack
            </Link>

            <div className="space-x-4 flex items-center">
              {/* <Button variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button> */}
              <Button asChild>
                <Link href="/report">Report Issue</Link>
              </Button>

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