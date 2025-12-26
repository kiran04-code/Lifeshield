import nodemailer from "nodemailer";

export const sendmaintoUser = async (email, otps) => {
  try {
      const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });


  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Doctor OTP Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Outfit', sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
      
      <h1 style="color: #2c3e50; margin-bottom: 20px;">Welcome to LifeShield, Doctor!</h1>
      
      <p style="font-size: 16px; color: #555;">
        Thank you for joining our medical community. We’re excited to have you onboard.
      </p>

      <p style="margin-top: 25px; font-size: 18px; font-weight: bold; color: #333;">
        Your One-Time Password (OTP) is:
      </p>

      <p style="font-size: 32px; color: #007BFF; font-weight: 700; margin: 10px 0;">
        ${otps}
      </p>

      <p style="font-size: 14px; color: #888;">
        Please do not share this OTP with anyone. It is valid only for a limited time.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 14px; color: #999;">
        If you did not initiate this request, please ignore this email or contact our support.
      </p>

      <p style="margin-top: 20px; font-size: 16px; color: #555;">
        — The LifeShield Team
      </p>
    </div>
  </body>
</html>`;

    const info = await transporter.sendMail({
      from: `LifeShield <${process.env.EMAIL}>`,
      to: email,
      subject: "Your One-Time Password (OTP)",
      html,
    });

    return info; 

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
