import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { auth_config } from "./auth.config";
import {
  ADMINISTRANT_ROUTES,
  CLIENT_ROUTES,
  MODERATOR_ROUTES,
  PUBLIC_ROUTES,
} from "./lib/routes";

const { auth } = NextAuth(auth_config);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const pathname = nextUrl.pathname;

  const user = auth?.user;
  const role = user?.role || "";
  const emailVerified = user?.emailVerified;
  console.log("\n user in middleware:", user);

  //   const isPublicPage = PUBLIC_ROUTES.includes(pathname);
  const isPublicPage = PUBLIC_ROUTES.some(
    (street) => street === pathname || pathname.startsWith("/blogs/")
  );
  const isChiefPage = ADMINISTRANT_ROUTES.some((street) =>
    pathname.startsWith(street)
  );
  const isModeratorPage = MODERATOR_ROUTES.some((street) =>
    pathname.startsWith(street)
  );
  const isClientPage = CLIENT_ROUTES.some((street) =>
    pathname.startsWith(street)
  );

  //   if (user && emailVerified !== true) {
  //     return NextResponse.redirect(
  //       new URL(`/verify-email?email=${user.email}`, nextUrl)
  //     );
  //   }

  const isOnVerificationRoute = [
    "/verify-email",
    "/api/verify-email",
    "/api/verify-code",
    "/api/verify-token",
    "/api/resend-verification-email",
    "/api/auth/signout",
    "/api/auth/csrf",
    "/api/auth/session",
    //  "/api/auth/signin",
    //  "/login",
  ].some((route) => pathname.startsWith(route));

  // ✅ Prevent loop: only redirect if not already on verification-related route
  if (user && emailVerified !== true && !isOnVerificationRoute) {
    return NextResponse.redirect(
      new URL(`/verify-email?email=${user.email}`, nextUrl)
    );
  }

  if (isPublicPage) {
    return null;
  }

  if (!user && (isChiefPage || isModeratorPage || isClientPage)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isChiefPage && role !== "administrant") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  if (isModeratorPage && !["administrant", "moderator"].includes(role)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  if (isClientPage && !["administrant", "client"].includes(role)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
