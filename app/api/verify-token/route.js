// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { token } = await req.json();

//   const user = await User.findOne({
//     verificationToken: token,
//     verificationTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
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
  await dbConnect();

  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified" });
  } catch (err) {
    console.error("Token verification error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
