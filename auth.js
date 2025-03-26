// import dbConnect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { auth_config } from "./auth.config";
// import { dbConnect } from "./config/dbConnect";

async function refresh_access_token_rebuild(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token_rebuild,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshed_tokens_rebuild = await response.json();

    if (!response.ok) {
      throw refreshed_tokens_rebuild;
    }

    return {
      ...token,
      access_token_rebuild: refreshed_tokens_rebuild?.access_token,
      access_token_expires_rebuild:
        Date.now() + refreshed_tokens_rebuild?.expires_in * 1000,
      refresh_token_rebuild: refreshed_tokens_rebuild?.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "refresh_access_token_rebuild_error",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...auth_config,
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
          const user = await User.findOne({ email: credentials.email })
            .select("+password role email")
            .lean();

          if (!user) {
            throw new Error("No user found with this email.");
          }

          console.log("User from DB:", user);
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

          //  user._id = user._id.toString();
          //  delete user.password;
          console.log("Login successful!", user);
          return {
            // success: true,
            // message: "Login successful",
            // user: {
            //   id: user._id.toString(),
            //   name: `${user.firstName} ${user.lastName}`,
            //   email: user.email,
            //   avatar: user.avatar,
            // },

            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.avatar,
            role: user.role,
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
      async profile(profile) {
        return {
          id: profile.id,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        };
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
        //   await dbConnect();

        const email = profile?.email || user.email;

        if (!email) {
          throw new Error("Email is required for new users.");
        }

        // Check if the user already exists
        let existing = await User.findOne({ email: user.email });

        if (!existing) {
          //  if (!user.email) {
          //    throw new Error("Email is required for new users.");
          //  }

          // If the user does not exist, create a new entry
          await User.create({
            firstName: profile?.given_name || "blanks",
            lastName: profile?.family_name || "blanks",
            email,
            avatar: user.image || "https://example.com/default-avatar.jpg",
            role: "client",
          });
        } else {
          user.role = existing.role;
        }

        //   user.role = existing.role;

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false;
      }
    },

    //  async signIn({ user, account, profile }) {
    //    try {
    //      await dbConnect();

    //      let existingUser = await User.findOne({ email: user.email });

    //      if (!existingUser) {
    //        if (!user.email) {
    //          throw new Error("Email is required for new users.");
    //        }
    //      }
    //      //   if (!existingUser) {
    //      //     const newUser = new User({
    //      //       firstName: user.given_name || "",
    //      //       lastName: user.family_name || "",
    //      //       email: user.email,
    //      //       avatar: user.image || "https://example.com/default-avatar.jpg",
    //      //     });

    //      //     await newUser.save();
    //      //   }

    //      await User.create({
    //        firstName: profile?.given_name || "jj",
    //        lastName: profile?.family_name || "jj",
    //        email: profile?.email || "hello@gmail.com", // Ensure this exists
    //        avatar: user.image || "https://example.com/default-avatar.jpg",
    //        role: "client", // Assign default role
    //      });

    //      return true;
    //    } catch (error) {
    //      console.error("Error in signIn callback", error);
    //      return false;
    //    }
    //  },
    async jwt({ token, user, account }) {
      if (user) {
        return {
          access_token_rebuild: account?.access_token,
          access_token_expires_rebuild: Date.now() + account?.expires_in * 1000,
          refresh_token_rebuild: account?.refresh_token,
          user,
        };
      }

      console.log(
        `token will expire at: ${new Date(token.access_token_expires_rebuild)}`
      );

      if (Date.now() < token?.access_token_expires_rebuild) {
        console.log(`at: ${new Date(Date.now())}, using old access token`);
        return token;
      }

      console.log(`token expired at: ${new Date(Date.now())}`);
      return refresh_access_token_rebuild(token);
    },
    async session({ session, token }) {
      session.user = token?.user;
      session.access_token_rebuild = token?.access_token;
      session.error = token?.error;

      console.log(`returning session: ${JSON.stringify(session)}`);
      return session;
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
  //   session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
