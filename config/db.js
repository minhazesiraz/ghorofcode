import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MongoDB URI is missing!");

const dbConnect = async () => {
  //   https://cloud.mongodb.com/v2/67d9d5432bd98e735793c12c#/security/network/accessList
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    //  const connection = await mongoose.connect(String(MONGODB_URI));
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
export default dbConnect;
