"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    //  const userData = {
    //    firstName: e.target.firstName.value,
    //    lastName: e.target.lastName.value,
    //    email: e.target.email.value,
    //    password: e.target.password.value,
    //  };
    //  console.log(userData);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      } else {
        router.push("/auth/login"); // Redirect to login page
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
