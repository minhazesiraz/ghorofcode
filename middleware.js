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
