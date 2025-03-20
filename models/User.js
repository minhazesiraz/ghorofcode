import crypto from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["administrant", "moderator", "client"],
      default: "client",
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.jpg",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

userSchema.methods.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(32).toString("hex");
};

userSchema.methods.generateResetToken = function () {
  this.resetToken = crypto.randomBytes(32).toString("hex");
  this.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min expiration
};

// export default mongoose.models.User || mongoose.model("User", userSchema);
export default mongoose.models.User ||
  mongoose.model("User", userSchema, "users");
