import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials);
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          console.error("User not found");
          throw new Error("Invalid credentials.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.error("Incorrect password");
          throw new Error("Invalid credentials.");
        }

        if (!user.emailVerified) {
          console.error("Email not verified");
          throw new Error("Email not verified.");
        }

        console.log("User authenticated successfully:", user);
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      session.user.id = token.id;
      return session;
    },
  },
};

export const { auth, handlers } = NextAuth(authOptions);
