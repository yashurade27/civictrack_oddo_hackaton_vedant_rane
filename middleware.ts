import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // If the request is targeting an admin route...
  if (isAdminRoute(req)) {
    if (sessionClaims?.metadata?.role !== 'admin') {
      // Redirect non-admin users to home
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }
  // Otherwise, continue normally
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
