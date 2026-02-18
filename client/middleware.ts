// middleware.ts (or proxy.ts for some App Router setups)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // If route matches public list, do nothing
  if (isPublicRoute(request)) return;

  // Otherwise protect — redirect to sign‑in if not authenticated
  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // protect everything except Next internals + static assets
    "/(api|trpc)(.*)",       // include API routes if you want
  ],
};
