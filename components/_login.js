"use server";

import { signIn } from "@/auth";
import { headers } from "next/headers";

// export async function loginWithCredentials(formData) {
//   try {
//     //  const { email, password } = formData;

//     const user = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false, // Ensures no automatic redirection
//     });
//     console.log(user); // Debugging

//     if (user?.error) {
//       return { error: user.error };
//     }

//     return user;
//   } catch (error) {
//     return { error: error.message };
//   }
// }

export async function loginWithCredentials(formData) {
  try {
    const requestHeaders = await headers(); // Ensure headers() is awaited if needed

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Email:", email);
    console.log("Password:", password ? "*****" : "Missing!");

    //  if (!email || !password) {
    //    return { error: "Email and password are required." };
    //  }

    const user = await signIn("credentials", {
      email,
      password,
      redirect: false, // No auto-redirect
      headers: requestHeaders, // Ensure headers are passed correctly
    });

    console.log("Sign-in response:", user);

    //  if (user?.error) {
    //    return { error: user.error };
    //  }

    if (!user || user.error) {
      throw new Error(user?.error || "Login failed.");
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    //  return { error: error.message };
    throw new Error(error.message || "Login failed.");
  }
}

export async function google() {
  try {
    const user = await signIn("google", { callbackUrl: "/blogs" });
    return user;
  } catch (error) {
    return { error: error.message };
  }
}

export async function facebook() {
  try {
    const user = await signIn("facebook", { callbackUrl: "/blogs" });
    return user;
  } catch (error) {
    return { error: error.message };
  }
}
