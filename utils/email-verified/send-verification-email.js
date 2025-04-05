import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email, token, verificationCode) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Verify your email address",
    //  html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    html: `
    <p>Click to verify: <a href="${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}">Verify</a></p>
    <p>Or use this code: <strong>${verificationCode}</strong></p>
  `,
  };

  await transporter.sendMail(mailOptions);
}
