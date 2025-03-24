import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const user = await getUser(credentials.email); // Fetch from DB
        if (!user) throw new Error("User not found");

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
