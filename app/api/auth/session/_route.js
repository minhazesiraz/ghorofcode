// // import { getServerSession } from "next-auth";
// // import { auth_config } from "@/app/auth.config"; // Your NextAuth config
// // import { auth_config } from "@/auth.config";
// import { auth } from "@/auth";
// import dbConnect from "@/config/db"; // Ensure database connection
// import User from "@/models/User"; // Import your User model

// export default async function handler(req, res) {
//   await dbConnect(); // Connect to MongoDB

//   //   const session = await getServerSession(req, res, auth_config);
//   const session = await auth();
//   if (!session) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const user = await User.findOne({ email: session.user.email }).select("role");
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   return res.status(200).json({ role: user.role });
// }

// import { auth } from "@/auth";
// import dbConnect from "@/config/db"; // Ensure database connection
// import User from "@/models/User"; // Import your User model
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   await dbConnect(); // Connect to MongoDB

//   const session = await auth(); // Get session using NextAuth v5
//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const user = await User.findOne({ email: session.user.email }).select("role");
//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json({ role: user.role }, { status: 200 });
// }

// import { auth } from "@/auth"; // Correct import in NextAuth v5
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth(); // Correct usage in NextAuth v5

//   if (!session) {
//     return NextResponse.json({ session: null }, { status: 401 });
//   }

//   return NextResponse.json({ session }, { status: 200 });
// }
