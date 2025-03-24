import dbConnect from "@/config/db";
import User from "@/models/User";

export async function GET(req) {
  await dbConnect();

  try {
    const users = await User.find().select("-password");
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Parse JSON body
    const { firstName, lastName, email, password, role } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Create user
    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    return Response.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
