// export const auth_config = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [],
// };

// export const auth_config = {
//   pages: { signIn: "/login" },
//   providers: [],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.uid = user._id;
//         token.email = user.email;
//         token.role = user.role; // ✅ Store role in token
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.uid = token.uid;
//       session.user.role = token.role; // ✅ Store role in session
//       return session;
//     },
//   },
// };

// src/app/api/auth/auth.config.ts

// import { NextAuthConfig } from "next-auth"

// import User from "@/models/User";

export const auth_config = {
  pages: { signIn: "/login" },
  providers: [],
  session: {
    strategy: "jwt",
  }, // production build
  trustHost: true, // ✅ This explicitly trusts localhost
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {
      // if (user) {
      //   const payload = JSON.parse(
      //     Buffer.from(user?.accessToken.split(".")[1], "base64").toString()
      //   );

      //   token.id = payload.id;
      //   token.email = payload.email;
      //   token.role = payload.role;
      //   token.status = payload.status;

      //   return token;
      // }
      // return token;

      if (user) {
        token.id = user.id; // Ensure ID is stored in the token
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = user.emailVerified;

        //   console.log("Updated Token in auth.config.js:", token); not working
      }

      // Refresh emailVerified if token exists but outdated
      // const dbUser = await User.findUnique({ where: { email: token.email } });
      // if (dbUser && dbUser.emailVerified !== token.emailVerified) {
      //   token.emailVerified = dbUser.emailVerified;
      // }
      // console.log("Updated Token in auth.config.js:", token); not working

      //  const dbUser = await db.user.findUnique({ where: { email: token.email } });
      //  if (dbUser && dbUser.emailVerified !== token.emailVerified) {
      //    token.emailVerified = dbUser.emailVerified;
      //  }

      return token;
    },

    async session({ session, token, user, trigger, newSession }) {
      // session.user.uid = token?.uid;
      // session.user.status = token?.status;
      // session.user.role = token?.role;
      // session.user.name = token?.name || "";

      session.user.id = token.id; // Assign ID from token to session
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.emailVerified = token.emailVerified;

      console.log(`Returning session: ${JSON.stringify(session)}`);

      return session;
    },
  },
};
