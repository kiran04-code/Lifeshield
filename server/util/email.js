import nodemailer from "nodemailer";

export const sendmaintoUser = async (email, otps) => {
  try {
    const transporter = nodemailer.createTransport({
          host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey", // ← REQUIRED
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Doctor OTP Verification</title>
</head>
<body>
  <h2>Your OTP is: ${otps}</h2>
</body>
</html>`;

    const info = await transporter.sendMail({
      from: `LifeShield <${process.env.EMAIL}>`,
      to: email,
      subject: "Your One-Time Password (OTP)",
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Failed to send email");
  }
};
