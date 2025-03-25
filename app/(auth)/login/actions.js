// "use server";

// // import User from "@/models/User";
// // import bcrypt from "bcryptjs";
// // import connectDB from "@/lib/mongodb";
// import { signIn } from "next-auth/client";

// export async function handleSignIn(formData) {
//   try {
//     const result = await signIn("credentials", formData);
//     console.log(result);
//     return result;
//     console.log("Logging in with credentials:", credentials);

//     //  await connectDB();

//     //  console.log("Checking user in the database...");
//     //  const user = await User.findOne({ email: credentials.email })
//     //    .select("+password")
//     //    .lean();

//     //  if (!user) throw new Error("User not found");

//     //  console.log("User found:", user);
//     //  if (!user.password) throw new Error("Password not found for this user");

//     //  console.log("Comparing password...");
//     //  const isValid = await bcrypt.compare(credentials.password, user.password);
//     //  if (!isValid) throw new Error("Invalid credentials");

//     //  user._id = user._id.toString();
//     //  delete user.password;
//     //  console.log("Login successful!");
//     //  return {
//     //    success: true,
//     //    message: "Login successful",
//     //    user: {
//     //      id: user._id.toString(), // Convert _id to a string
//     //      name: `${user.firstName} ${user.lastName}`, // Concatenate full name
//     //      email: user.email,
//     //    },
//     //  };
//   } catch (error) {
//     console.error(error);
//     return { success: false, message: error.message };
//   }
// }

"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignIn(formData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      return { error: result.error };
    }

    // Manual redirection after authentication
    redirect("/blogs");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed. Please try again." };
  }
}
