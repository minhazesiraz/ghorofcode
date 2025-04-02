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

// import { NextResponse } from "next/server";
// import { auth } from "./auth";

// export default auth(async (req) => {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;

//   const isAuthenticated = !!req.auth?.user;
//   const userRole = req.auth?.user?.role;

//   console.log(
//     "Middleware - Authenticated:",
//     isAuthenticated,
//     "Role:",
//     userRole,
//     "Path:",
//     pathname
//   );

//   const ADMIN_ROUTES = ["/administrant", "/exec/*"];
//   const MODERATOR_ROUTES = ["/moderator", "/editor/*"];

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }

//   if (
//     ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
//     userRole !== "administrant"
//   ) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   if (
//     MODERATOR_ROUTES.some((route) => pathname.startsWith(route)) &&
//     !["administrant", "moderator"].includes(userRole)
//   ) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/exec/:path*", "/editor/:path*"],
// };

// import { NextResponse } from "next/server";
// import { auth } from "./auth";

// export default auth(async (req) => {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;

//   const isAuthenticated = !!req.auth?.user;
//   const userRole = req.auth?.user?.role;

//   console.log(
//     "Middleware - Authenticated:",
//     isAuthenticated,
//     "Role:",
//     userRole,
//     "Path:",
//     pathname
//   );

//   // Define role-based protected routes
//   const ADMIN_ROUTES = ["/administrant", "/exec"];
//   const MODERATOR_ROUTES = ["/moderator", "/editor"];

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }

//   // Check if user is trying to access an admin-only route
//   if (
//     ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
//     userRole !== "administrant"
//   ) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   // Check if user is trying to access a moderator-only route
//   if (
//     MODERATOR_ROUTES.some((route) => pathname.startsWith(route)) &&
//     !["administrant", "moderator"].includes(userRole) // Admins & Moderators can access
//   ) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   return NextResponse.next();
// });

// // Fix: Include all necessary routes in `matcher`
// export const config = {
//   matcher: [
//     "/administrant/:path*", // Admin routes
//     "/exec/:path*", // Admin routes
//     "/moderator/:path*", // Moderator routes
//     "/editor/:path*", // Moderator routes
//   ],
// };

// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const apiResponse = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
//     method: "GET",
//     credentials: "include", // ✅ Ensures cookies are sent
//     headers: { Cookie: req.headers.get("cookie") || "" },
//   });

//   if (apiResponse.status !== 200) {
//     return NextResponse.redirect(new URL("/login", req.url)); // Redirect if not authenticated
//   }

//   const { session } = await apiResponse.json();
//   if (!session || !session.user) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// // Protect routes
// export const config = {
//   matcher: ["/exec/:path*", "/editor/:path*"],
// };

// import NextAuth from "next-auth";
// import { NextResponse } from "next/server";
// import { auth_config } from "./auth.config";
// import {
//   ADMINISTRANT_ROUTES,
//   CLIENT_ROUTES,
//   MODERATOR_ROUTES,
//   PUBLIC_ROUTES,
// } from "./lib/routes";

// const { auth } = NextAuth(auth_config);

// export default auth((req) => {
//   const { nextUrl, auth } = req;
//   const pathname = nextUrl.pathname;

//   const user = auth?.user;
//   const role = user?.role;
//   console.log("\n user in middleware:", user);

//   // Print User in console
//   // id: '6408f7838db2ba8030d72e18',
//   // email: 'minhazesiraz@gmail.com',
//   // status: 'Active',
//   // role: 'administrant',

//   const isPublicPage = PUBLIC_ROUTES.some((street) =>
//     pathname.startsWith(street)
//   );
//   const isChiefPage = ADMINISTRANT_ROUTES.some((street) =>
//     pathname.startsWith(street)
//   );
//   const isModeratorPage = MODERATOR_ROUTES.some((street) =>
//     pathname.startsWith(street)
//   );
//   const isClientPage = CLIENT_ROUTES.some((street) =>
//     pathname.startsWith(street)
//   );

//   if (isPublicPage) {
//     return null;
//   }

//   if (!user && (isChiefPage || isModeratorPage || isClientPage)) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }

//   if (isChiefPage && !role.includes("administrant")) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }
//   if (isModeratorPage && !["administrant", "moderator"].includes(role)) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }
//   if (isClientPage && !["administrant", "client"].includes(role)) {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   //   if (!user && isChiefPage && role !== "administrant") {
//   //     return NextResponse.redirect(new URL("/", nextUrl));
//   //   }

//   //   if (
//   //     !user &&
//   //     isModeratorPage &&
//   //     !["administrant", "moderator"].includes(role)
//   //   ) {
//   //     return NextResponse.redirect(new URL("/", nextUrl));
//   //   }

//   //   if (!user && isClientPage && !["administrant", "client"].includes(role)) {
//   //     return NextResponse.redirect(new URL("/", nextUrl));
//   //   }

//   //   const isAdminPage = nextUrl?.pathname.startsWith("/exec");

//   //   // Redirect if not ADMIN
//   //   if (isAdminPage && !user?.role.includes("administrant")) {
//   //     return Response.redirect(new URL("/", nextUrl));
//   //   }

//   // Other protected pages ...

//   return null;
//   //   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
