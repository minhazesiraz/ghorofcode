"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResendVerificationButton from "./_components/resend-verification-email";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailFromQuery = searchParams.get("email");

  const [email, setEmail] = useState(emailFromQuery || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

  // ✅ Verify via token from URL
  useEffect(() => {
    const verifyByToken = async () => {
      if (!token) return;

      setVerifying(true);
      setMessage("Verifying via link...");

      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) {
          setMessage(data.error || "Token verification failed.");
        } else {
          setMessage("✅ Email verified successfully!");
          setTimeout(() => router.push("/"), 3000);
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong.");
      } finally {
        setVerifying(false);
      }
    };

    verifyByToken();
  }, [token, router]);

  // ✅ Verify via code input
  const handleCodeVerify = async () => {
    if (!email || !code) {
      setMessage("Please enter your email and verification code.");
      return;
    }

    setMessage("Verifying code...");

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Verification failed.");
      } else {
        setMessage("✅ Email verified successfully!");
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (err) {
      console.error("Request failed:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>

        {verifying ? (
          <p>🔄 Verifying link...</p>
        ) : token ? (
          <p className="text-green-600">{message}</p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <button
              onClick={handleCodeVerify}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Verify Code
            </button>
          </>
        )}
        <ResendVerificationButton email={email} />
        {verifying && <p className="mt-4">🔄 Verifying...</p>}

        {message && !verifying && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
