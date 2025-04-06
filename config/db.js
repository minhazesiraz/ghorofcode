import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is missing!");
}

let isConnected = false;

const dbConnect = async () => {
  //   https://cloud.mongodb.com/v2/67d9d5432bd98e735793c12c#/security/network/accessList
  if (isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    const mongodb_connection = await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      dbName: "ghorofcode",
      connectTimeoutMS: 30000, // Adjust the timeout duration as needed // production build
      // socketTimeoutMS: 30000, // Adjust the timeout duration as needed // production build
      // connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });
    //  const connection = await mongoose.connect(String(MONGODB_URI));
    isConnected = true;
    console.log("MongoDB connected successfully");
    //  console.log(
    //    `Connected to MongoDB Atlas Cluster: ${mongoose.connection.host}, database: ${mongoose.connection.db.databaseName}`
    //  );
    return mongodb_connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    //  process.exit(1);
  }
};
export default dbConnect;
