"use server";

import User from "@/models/User";
import bcrypt from "bcryptjs";
// import connectDB from "@/lib/mongodb";

export async function handleSignIn(credentials) {
  try {
    //  await connectDB();

    console.log("Checking user in the database...");
    const user = await User.findOne({ email: credentials.email })
      .select("+password")
      .lean();

    if (!user) throw new Error("User not found");

    console.log("User found:", user);
    if (!user.password) throw new Error("Password not found for this user");

    console.log("Comparing password...");
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    user._id = user._id.toString();
    delete user.password;
    console.log("Login successful!");
    return {
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(), // Convert _id to a string
        name: `${user.firstName} ${user.lastName}`, // Concatenate full name
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}
