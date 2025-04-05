"use client";

import { useState } from "react";

export default function ResendVerificationButton({ email }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resendEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/resend-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend email");

      setMessage("✅ Verification email resent.");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={resendEmail}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
