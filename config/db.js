import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is missing!");
}

const dbConnect = async () => {
  //   https://cloud.mongodb.com/v2/67d9d5432bd98e735793c12c#/security/network/accessList
  try {
    const mongodb_connection = await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      dbName: "ghorofcode",
    });
    //  const connection = await mongoose.connect(String(MONGODB_URI));
    console.log("MongoDB connected successfully");
    //  console.log(
    //    `Connected to MongoDB Atlas Cluster: ${mongoose.connection.host}, database: ${mongoose.connection.db.databaseName}`
    //  );
    return mongodb_connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
export default dbConnect;
