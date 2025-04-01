// import { LOGIN, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
// import NextAuth from "next-auth";
// import { NextResponse } from "next/server";
// import { auth_config } from "./auth.config";

// const { auth } = NextAuth(auth_config);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;

//   // Check if a user exists on the session object attached by auth()
//   const isAuthenticated = !!req.auth?.user;
//   console.log("middleware authenticated:", isAuthenticated, "Path:", pathname);

//   // Check if the pathname is one of the public routes
//   const isPublicRoute =
//     PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
//     pathname === ROOT;
//   console.log("middleware public route:", isPublicRoute);

//   if (!isAuthenticated && !isPublicRoute) {
//     return NextResponse.redirect(new URL(LOGIN, nextUrl));
//   }

//   return NextResponse.next();
// });

// // export const config = {
// //   matcher: ["/((?!.+\\.[\\w]+$|_next|api/auth).*)", "/", "/(api|trpc)(.*)"],
// // };

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next|api/auth).*)", "/", "/(api|trpc)(.*)"],
// };

// // import { NextResponse } from "next/server";
// // import { auth } from "./auth";

// // export default auth(async (req) => {
// //   const { nextUrl } = req;
// //   const pathname = nextUrl.pathname;

// //   const isAuthenticated = !!req.auth?.user;
// //   const userRole = req.auth?.user?.role;

// //   console.log(
// //     "Middleware - Authenticated:",
// //     isAuthenticated,
// //     "Role:",
// //     userRole,
// //     "Path:",
// //     pathname
// //   );

// //   const ADMIN_ROUTES = ["/administrant", "/exec/*"];
// //   const MODERATOR_ROUTES = ["/moderator", "/editor/*"];

// //   if (!isAuthenticated) {
// //     return NextResponse.redirect(new URL("/login", nextUrl));
// //   }

// //   if (
// //     ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
// //     userRole !== "administrant"
// //   ) {
// //     return NextResponse.redirect(new URL("/", nextUrl));
// //   }

// //   if (
// //     MODERATOR_ROUTES.some((route) => pathname.startsWith(route)) &&
// //     !["administrant", "moderator"].includes(userRole)
// //   ) {
// //     return NextResponse.redirect(new URL("/", nextUrl));
// //   }

// //   return NextResponse.next();
// // });

// // export const config = {
// //   matcher: ["/exec/:path*", "/editor/:path*"],
// // };

// // import { NextResponse } from "next/server";
// // import { auth } from "./auth";

// // export default auth(async (req) => {
// //   const { nextUrl } = req;
// //   const pathname = nextUrl.pathname;

// //   const isAuthenticated = !!req.auth?.user;
// //   const userRole = req.auth?.user?.role;

// //   console.log(
// //     "Middleware - Authenticated:",
// //     isAuthenticated,
// //     "Role:",
// //     userRole,
// //     "Path:",
// //     pathname
// //   );

// //   // Define role-based protected routes
// //   const ADMIN_ROUTES = ["/administrant", "/exec"];
// //   const MODERATOR_ROUTES = ["/moderator", "/editor"];

// //   if (!isAuthenticated) {
// //     return NextResponse.redirect(new URL("/login", nextUrl));
// //   }

// //   // Check if user is trying to access an admin-only route
// //   if (
// //     ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
// //     userRole !== "administrant"
// //   ) {
// //     return NextResponse.redirect(new URL("/", nextUrl));
// //   }

// //   // Check if user is trying to access a moderator-only route
// //   if (
// //     MODERATOR_ROUTES.some((route) => pathname.startsWith(route)) &&
// //     !["administrant", "moderator"].includes(userRole) // Admins & Moderators can access
// //   ) {
// //     return NextResponse.redirect(new URL("/", nextUrl));
// //   }

// //   return NextResponse.next();
// // });

// // // Fix: Include all necessary routes in `matcher`
// // export const config = {
// //   matcher: [
// //     "/administrant/:path*", // Admin routes
// //     "/exec/:path*", // Admin routes
// //     "/moderator/:path*", // Moderator routes
// //     "/editor/:path*", // Moderator routes
// //   ],
// // };

// // import { NextResponse } from "next/server";

// // export async function middleware(req) {
// //   const apiResponse = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
// //     method: "GET",
// //     credentials: "include", // ✅ Ensures cookies are sent
// //     headers: { Cookie: req.headers.get("cookie") || "" },
// //   });

// //   if (apiResponse.status !== 200) {
// //     return NextResponse.redirect(new URL("/login", req.url)); // Redirect if not authenticated
// //   }

// //   const { session } = await apiResponse.json();
// //   if (!session || !session.user) {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   return NextResponse.next();
// // }

// // // Protect routes
// // export const config = {
// //   matcher: ["/exec/:path*", "/editor/:path*"],
// // };
