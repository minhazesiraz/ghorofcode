"use server";

import User from "@/models/User"; // Import your User model
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function requestPasswordReset(email) {
  //   "use server";

  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };

  // Generate Reset Token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins expiry
  await user.save();

  // Send Email with Reset Link
  const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}&email=${email}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  });

  return { success: "Password reset link sent to your email" };
}

export async function resetPassword(email, token, newPassword) {
  //   "use server";

  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };

  // Validate Reset Token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  if (user.resetToken !== hashedToken || user.resetTokenExpiry < Date.now()) {
    return { error: "Invalid or expired token" };
  }

  // Hash New Password & Update
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return { success: "Password successfully reset. You can now login." };
}
