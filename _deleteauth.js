// // import dbConnect from "@/config/db";
// // import dbConnect from "@/config/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import { auth_config } from "./auth.config";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   ...auth_config,
//   providers: [
//     Credentials({
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
//             // name: `${user.firstName} ${user.lastName}`,
//             name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
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
//         //   await dbConnect();
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
//   secret: process.env.NEXTAUTH_SECRET,
// });
