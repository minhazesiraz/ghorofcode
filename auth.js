import dbConnect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password.");
          }

          console.log("Checking user in the database...");
          const user = await Ussr.findOne({ email: credentials.email })
            .select("+password")
            .lean();

          if (!user) {
            throw new Error("No user found with this email.");
          }

          //  console.log("User from DB:", user);
          if (!user.password) {
            throw new Error("Password not found for this user");
          }

          console.log("Comparing password...");
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          user._id = user._id.toString();
          delete user.password;
          console.log("Login successful!", user);
          return {
            success: true,
            message: "Login successful",
            user: {
              id: user._id.toString(),
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              avatar: user.avatar,
            },
          };
        } catch (error) {
          throw new Error(
            error.message || "Authentication failed. Please try again."
          );
        }

        //   let user = null;

        //   // logic to salt and hash password
        //   const pwHash = saltAndHashPassword(credentials.password);

        //   // logic to verify if the user exists
        //   user = await getUserFromDb(credentials.email, pwHash);

        //   if (!user) {
        //     // No user found, so this is their first attempt to login
        //     // Optionally, this is also the place you could do a user registration
        //     throw new Error("Invalid credentials.");
        //   }

        //   // return user object with their profile data
        //   return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
    //  Facebook({
    //    clientId: process.env.FACEBOOK_CLIENT_ID,
    //    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //  }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            firstName: user.given_name || "",
            lastName: user.family_name || "",
            email: user.email,
            avatar: user.image || "https://example.com/default-avatar.jpg",
          });

          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false;
      }
    },

    //   async jwt({ token, user }) {
    //     if (user) {
    //       token.id = user.id;
    //       token.role = user.role;
    //     }
    //     return token;
    //   },
    //   async session({ session, token }) {
    //     session.user.id = token.id;
    //     session.user.role = token.role;
    //     return session;
    //   },
  },
  //   pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
