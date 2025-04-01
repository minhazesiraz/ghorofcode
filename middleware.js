// src/middleware.ts

import NextAuth from "next-auth";
// import { NextResponse } from "next/server"
// import { authConfig } from "./app/api/auth/auth.config"
import { auth_config } from "./auth.config";

const { auth } = NextAuth(auth_config);

export default auth((req) => {
  const { nextUrl, auth } = req;

  const user = auth?.user;
  console.log("\n user in middleware:>> ", user);

  // Print User in console
  //  email: 'mysupermail@gmail.com',
  //  uid: '6408f7838db2ba8030d72e18',
  //  status: 'ACTIVE',
  //  roles: [ 'ADMIN', 'USER' ]

  const isAdminPage = nextUrl?.pathname.startsWith("/exec");

  // Redirect if not ADMIN
  if (isAdminPage && !user?.role.includes("administrant")) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // Other protected pages ...

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
