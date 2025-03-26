// import { auth } from "@/auth";
import NextAuth from "next-auth";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth_config } from "./auth.config";

const { auth } = NextAuth(auth_config);

export default auth(async (req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const session = await req.auth;
  console.log("Session in middleware:", session.user);

  //   const session = await getSession({ req });

  // Get the session properly
  //   const session = await getServerSession({ req }, auth_config);

  if (
    !session &&
    (pathname.startsWith("/exec") || pathname.startsWith("/editor"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    // Role-Based Access Control (RBAC)
    const role = session?.user?.role;
    console.log("Role:", role);

    if (pathname.startsWith("/exec") && role !== "administrant") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/editor") && role !== "moderator") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/exec/:path*", "/editor/:path*"],
};

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// export { auth as middleware } from "@/auth";

// // node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

// const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// export async function middleware(req) {
//   const token = await getToken({ req, secret: NEXTAUTH_SECRET });
//   const pathname = req.nextUrl.pathname;

//   if (
//     !token &&
//     (pathname.startsWith("/exec") || pathname.startsWith("/editor"))
//   ) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // Role-Based Access Control (RBAC)
//   if (pathname.startsWith("/exec") && token?.role !== "administrant") {
//     return NextResponse.redirect(new URL("/blogs", req.url));
//   }

//   if (pathname.startsWith("/editor") && token?.role !== "moderator") {
//     return NextResponse.redirect(new URL("/blogs", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/exec/:path*", "/editor/:path*"],
// };
