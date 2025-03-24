"use server";

import { signIn } from "@/auth";

export async function credentialsLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("credentialsLogin", response);

    return response;
  } catch (error) {
    console.error("credentialsLogin", error);
    throw new Error(error.message);
    //  return { error: error.message };
  }
}
