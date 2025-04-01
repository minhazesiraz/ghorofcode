// // // import { auth } from "@/auth";
// // import NextAuth from "next-auth";
// // // import { getSession } from "next-auth/react";
// // // import { getServerSession } from "next-auth";
// // import { NextResponse } from "next/server";
// // import { auth_config } from "./auth.config";

// // const { auth } = NextAuth(auth_config);

// // export default auth(async (req) => {
// //   const { nextUrl } = req;
// //   const pathname = nextUrl.pathname;

// //   const session = await req.auth;
// //   console.log("Session in middleware:", session.user);

// //   //   const session = await getSession({ req });

// //   // Get the session properly
// //   //   const session = await getServerSession({ req }, auth_config);

// //   if (
// //     !session &&
// //     (pathname.startsWith("/exec") || pathname.startsWith("/editor"))
// //   ) {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   } else {
// //     // Role-Based Access Control (RBAC)
// //     const role = session?.user?.role;
// //     console.log("Role:", role);

// //     if (pathname.startsWith("/exec") && role !== "administrant") {
// //       return NextResponse.redirect(new URL("/login", req.url));
// //     }

// //     if (pathname.startsWith("/editor") && role !== "moderator") {
// //       return NextResponse.redirect(new URL("/login", req.url));
// //     }
// //   }

// //   return NextResponse.next();
// // });

// // export const config = {
// //   matcher: ["/exec/:path*", "/editor/:path*"],
// // };

// // import { getToken } from "next-auth/jwt";
// // import { NextResponse } from "next/server";
// // export { auth as middleware } from "@/auth";

// // // node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

// // const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// // export async function middleware(req) {
// //   const token = await getToken({ req, secret: NEXTAUTH_SECRET });
// //   const pathname = req.nextUrl.pathname;

// //   if (
// //     !token &&
// //     (pathname.startsWith("/exec") || pathname.startsWith("/editor"))
// //   ) {
// //     return NextResponse.redirect(new URL("/auth/login", req.url));
// //   }

// //   // Role-Based Access Control (RBAC)
// //   if (pathname.startsWith("/exec") && token?.role !== "administrant") {
// //     return NextResponse.redirect(new URL("/blogs", req.url));
// //   }

// //   if (pathname.startsWith("/editor") && token?.role !== "moderator") {
// //     return NextResponse.redirect(new URL("/blogs", req.url));
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/exec/:path*", "/editor/:path*"],
// // };

// // import dbConnect from "@/config/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import { auth_config } from "./auth.config";
// // import { dbConnect } from "./config/db";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   ...auth_config,
//   //   debug: true;
//   //   session: {
//   //     strategy: "jwt",
//   //   },
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         try {
//           //  await dbConnect();

//           if (!credentials.email || !credentials.password) {
//             throw new Error("Please enter your email and password.");
//           }

//           console.log("Checking user in the database...");
//           const user = await User.findOne({ email: credentials.email })
//             .select("+password role email")
//             .lean();

//           if (!user) {
//             throw new Error("No user found with this email.");
//           }

//           console.log("User from DB:", user);
//           if (!user.password) {
//             throw new Error("Password not found for this user");
//           }

//           console.log("Comparing password...");
//           const isValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isValid) {
//             throw new Error("Invalid credentials");
//           }

//           console.log("Login successful!", user);
//           return {

//             id: user._id.toString(),
//             name: `${user.firstName} ${user.lastName}`,
//             email: user.email,
//             image: user.avatar,
//             role: user.role,
//           };
//         } catch (error) {
//           throw new Error(
//             error.message || "Authentication failed. Please try again."
//           );
//         }

//       },
//     }),
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           access_type: "offline",
//           prompt: "consent",
//           response_type: "code",
//         },
//       },
//       async profile(profile) {
//         const user = await User.findOne({ email: profile.email });

//         if (!user) {
//           await User.create({
//             firstName: profile.given_name,
//             lastName: profile.family_name,
//             email: profile.email,
//             avatar: profile.picture,
//             role: "client", // Default role for new users
//           });
//         }

//         return {
//           id: profile.id,
//           name: `${profile.given_name} ${profile.family_name}`,
//           email: profile.email,
//           image: profile.picture,
//           role: user?.role || "client",
//         };
//       },

//     }),

//   ],
//   callbacks: {

//     async jwt({ token, user, account }) {
//       if (user) {

//         token.role = user.role;
//       }
//       return token;

//     },
//     async session({ session, token }) {

//       session.user.role = token.role;

//       console.log(`returning session: ${JSON.stringify(session)}`);
//       return session;
//     },

//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });
