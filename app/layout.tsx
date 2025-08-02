import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CivicTrack',
  description: 'Report civic issues in your area with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Navbar merged here */}
          {/* <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-wide">
              CivicTrack
            </Link>

            <div className="space-x-4 flex items-center">
              <Button variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
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
          </nav> */}

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
