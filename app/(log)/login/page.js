"use client";

import { getSession, signIn, signOut } from "next-auth/react"; // Import signIn from next-auth/client
import { useRouter } from "next/navigation"; // Import Next.js router
import { useState } from "react";

// import { handleSignIn } from "./actions"; // Ensure the correct path

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await handleSignIn({ email, password });
      // console.log(response);
      const formData = new FormData(event.currentTarget);
      // const userData = Object.fromEntries(formData.entries());
      // const { email, password } = userData;
      // const result = await handleSignIn(formData);

      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        //   email,
        //   password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login page", result.error);
        setError(result.error);
        return;
      }
      //       const { data: session } = useSession();
      //   const emailFromSession = session?.user?.email;
      //   const emailVerified = session?.user?.emailVerified;

      // Wait a short moment then get the latest session
      const session = await getSession();

      const userEmail = session?.user?.email;
      const emailVerified = session?.user?.emailVerified;

      if (userEmail && emailVerified !== true) {
        //   router.push(`/verify-email?email=${userEmail}`);
        // Optionally log them out first
        await signOut({ callbackUrl: `/verify-email?email=${userEmail}` });
      } else {
        //   await getSession(); // Refresh session
        router.push("/");
      }
    } catch (error) {
      // console.error(error);
      console.error("Sign-in error:", error);
      setError(error.message || "An unexpected error occurred.");
      setLoading(false);
    } finally {
      setLoading(false);
    }

    //  setError(null);
    //  setLoading(true);

    //  try {
    //    const response = await handleSignIn({ email, password });

    //    if (!response.success) {
    //      throw new Error(response.message);
    //    }

    //    console.log("Login successful!", response);
    //    router.push("/blogs"); // Redirect to /blogs
    //  } catch (err) {
    //    setError(err.message);
    //  } finally {
    //    setLoading(false);
    //  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <button
          className="cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
