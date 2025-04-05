import dbConnect from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Server action for verifying email
export async function POST(req) {
  const { token } = await req.json();

  // Connect to DB
  await dbConnect();

  // Find user by verification token
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 400 }
    );
  }

  // Check if token is expired
  if (user.verificationTokenExpiry < Date.now()) {
    return NextResponse.json(
      { error: "Token has expired. Please request a new one." },
      { status: 400 }
    );
  }

  // Mark email as verified
  user.emailVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiry = null;

  try {
    await user.save();
    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
