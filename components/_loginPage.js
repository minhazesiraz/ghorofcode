"use client";

import { loginWithCredentials } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      // const userData = Object.fromEntries(formData.entries());
      const result = await loginWithCredentials(formData);
      // console.log(userData);
      console.log(formData);
      console.log(formData.entries());
      console.log(Object.fromEntries(formData.entries()));
      console.log(result);

      if (result?.error) {
        console.error("Login page", result.error);
        setError(result.error);
        //   return;
      } else {
        router.push("/blogs");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

    //  const result = await signIn("credentials", {
    //    redirect: false,
    //    email,
    //    password,
    //  });

    //  console.log(result); // Debugging

    //  if (result?.error) {
    //    setError(result.error);
    //    return;
    //  }

    //  router.push("/blogs");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => signIn("google")}>Login with Google</button>
    </div>
  );
}
