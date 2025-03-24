import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt", // Using JWT-based session
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          name: "email",
          placeholder: "your@email.com",
        },
        password: { label: "Password", type: "password", name: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password.");
          }

          const user = await User.findOne({ email: credentials.email });
          console.log("User from DB:", user);

          if (!user) {
            throw new Error("No user found with this email.");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          // Ensure user has verified their email before allowing login
          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
          }

          // Return the user object with required fields
          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role || "client", // Include role if using role-based auth
          };
        } catch (error) {
          throw new Error(
            error.message || "Authentication failed. Please try again."
          );
        }
      },

      // authorize: async (credentials) => {
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
      // },
    }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.id = user.id;
  //         token.email = user.email;
  //         token.name = user.name;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (session.user) {
  //         session.user.id = token.id;
  //       }
  //       return session;
  //     },
  //   },
  //   pages: {
  //     signIn: "/auth/login", // Custom login page
  //   },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id.toString(); // Ensure ID is always a string
        token.role = user.role || "user"; // Ensure role exists
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
