import dbConnect from "@/config/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/utils/email-verified/send-verification-email";
import {
  generateVerificationCode,
  generateVerificationToken,
  generateVerificationTokenExpiry,
} from "@/utils/email-verified/token-expiry";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  // Connect to DB
  await dbConnect();

  // Find the user
  const user = await User.findOne({ email });
  if (!user || user.emailVerified) {
    return NextResponse.json(
      { error: "User not found or already verified." },
      { status: 400 }
    );
  }

  // Generate a new verification token and expiry
  const verificationToken = generateVerificationToken();
  const verificationTokenExpiry = generateVerificationTokenExpiry();
  const verificationCode = generateVerificationCode();

  // Update the user with the new token and expiry
  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = verificationTokenExpiry;
  user.verificationCode = verificationCode;

  try {
    await user.save();
    // Send the verification email
    await sendVerificationEmail(email, verificationToken, verificationCode);
    return NextResponse.json(
      { message: "Verification email resent." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
