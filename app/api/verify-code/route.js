// export async function POST(req) {
//   const { email, code } = await req.json();

//   const user = await User.findOne({
//     email,
//     verificationCode: code,
//     verificationTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return NextResponse.json(
//       { error: "Invalid code or expired" },
//       { status: 400 }
//     );
//   }

//   user.emailVerified = true;
//   user.verificationToken = undefined;
//   user.verificationCode = undefined;
//   user.verificationTokenExpiry = undefined;
//   await user.save();

//   return NextResponse.json({ message: "Email verified!" });
// }

import dbConnect from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Missing email or code" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid code or expired" },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.verificationCode = undefined;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error("VERIFY CODE ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
