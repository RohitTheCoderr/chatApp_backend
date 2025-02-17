import nodemailer from "nodemailer"
import otpGenerator from "otp-generator"
import dotenv from "dotenv"
dotenv.config()

const generateOTP = () => {
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
};

const sendOTPEmail = async (toEmail) => {
  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp} for verification. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully:", otp);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return null;
  }
};

export default sendOTPEmail;
// // Example usage
// sendOTPEmail("user@example.com").then((otp) => {
//   if (otp) console.log(`Generated OTP: ${otp}`);
// });
