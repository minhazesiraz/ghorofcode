"use client";

import { useSearchParams } from "next/navigation";
import ResendVerificationButton from "../verify-email/_components/resend-verification-email";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log("email in not verify email page:", email);

  return (
    <div>
      <h2>Verify your email</h2>
      <p>We sent a link to: {email}</p>
      <ResendVerificationButton email={email} />
    </div>
  );
}
