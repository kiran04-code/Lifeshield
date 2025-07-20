import nodemailer from "nodemailer";

export const sendmaintoUser = async (email, otps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL,       // Your Gmail address
        pass: process.env.EMAIL_PASS,  // Your App Password (NOT Gmail password)
      },
    });

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Welcome to LifeShield</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Outfit', sans-serif; background-color: #f4f4f4;">
      <div style="padding: 20px; text-align: center;">
        <h2 style="color: #333;">Your OTP Code</h2>
        <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${otps}</p>
        <p style="color: #666;">Please do not share this code with anyone.</p>
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
