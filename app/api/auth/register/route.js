import dbConnect from "@/config/db";
import User from "@/models/User";
// import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { firstName, lastName, email, password } = await req.json();
  //   console.log({ firstName, lastName, email, password });

  // Check if user exists
  let user = await User.findOne({ email });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // logic to salt and hash password
  //   const salt = await bcrypt.genSalt(10);
  const pwHash = await bcrypt.hash(password, 10);

  const userData = { firstName, lastName, email, password: pwHash };
  console.log(userData);

  try {
    await User.create(userData);
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // try {
  //   user = new User({ firstName, lastName, email, password: hashedPassword });
  //   await user.save();
  //   return NextResponse.json({ message: "User created" });
  // } catch (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // user = new User({ firstName, lastName, email, password: hashedPassword });
  // await user.save();
  // return NextResponse.json({ message: "User created" });

  //   user = new User({ firstName, lastName, email, password });
  //   await user.save();

  //   const accessToken = generateAccessToken(user);
  //   const refreshToken = generateRefreshToken(user);

  //   user.refreshToken = refreshToken;
  //   await user.save();

  //   return NextResponse.json({ accessToken, refreshToken });
}
