import crypto from "crypto";

export function generateVerificationToken() {
  return crypto.randomBytes(20).toString("hex"); // Generates a random 20-byte token
}

export function generateVerificationTokenExpiry() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours
}

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit code
}

// const verificationCode = crypto.randomInt(100000, 999999).toString();
// // OR: const code = Math.floor(100000 + Math.random() * 900000).toString();
// const token = crypto.randomBytes(32).toString("hex");
// const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

// await User.updateOne(
//   { email },
//   {
//     verificationToken: token,
//     verificationCode,
//     verificationTokenExpires: expires,
//   }
// );
