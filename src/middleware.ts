import { clerkMiddleware } from "@clerk/nextjs/server";

// Protect all routes by default, except static assets and Next.js internals
// The Clerk types in some versions don't include `publicRoutes` on the
// middleware options. Cast to `any` so we can keep the runtime behavior
// while satisfying the compiler.
export default clerkMiddleware({
  publicRoutes: [
    "/",          // your landing page
    "/favicon.ico",
    "/sw.js",
    "/_next(.*)", // allow Next.js internals
    "/api/webhooks(.*)" // example: allow webhooks if needed
  ],
} as any);

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * - static files
     * - images
     * - Next.js internals
     */
    "/((?!_next|.*\\..*).*)",
  ],
};
