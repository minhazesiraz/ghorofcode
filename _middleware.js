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
