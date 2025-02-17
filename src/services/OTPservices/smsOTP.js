import otppless from "otpless-node-js-auth-sdk";
import dotenv from "dotenv";

dotenv.config();
const { sendOTP, verifyOTP } = otppless;


const clientId = process.env.MY_OTPLESS_CLIENT_ID || "";
const secretId = process.env.MY_OTPLESS_CLIENT_SECRET || "";
const otpExpiryTime = Number(process.env.MY_OTPLESS_EXPIRY_TIME) || 300; // Default: 5 mins
const otpLength = Number(process.env.MY_OTPLESS_LENGTH) || 6; // Default: 6 digits

export async function sendOtponMobile(mobileNo, channel) {
  try {
    if (!clientId || !secretId) {
      console.log("OTPLESS_CLIENT_ID or OTPLESS_CLIENT_SECRET is missing in .env");
      return { success: false, message: "Server configuration error" };
    }

    console.log(`Sending OTP to ${mobileNo} via ${channel}`);

    const otpResponse = await sendOTP(
      mobileNo,
      null, // No email
      channel, // WhatsApp or SMS
      null,
      null,
      otpExpiryTime,
      otpLength,
      clientId,
      secretId
    );

    if (otpResponse && otpResponse.success === false) {
      return { success: false, message: "Failed to send OTP" };
    }

    return { success: true, message: otpResponse.orderId };
  } catch (err) {
    console.log("Error while sending OTP:", err);
    return { success: false, message: err.message };
  }
}

export async function verifyOtponMobile(mobileNo, uniqueId, otp) {
    console.log(`Verifying OTP for ${mobileNo}`);

  try {
    if (!clientId || !secretId) {
        console.log("OTPLESS_CLIENT_ID or OTPLESS_CLIENT_SECRET is missing in .env");
      return { success: false, message: "Server configuration error" };
    }

    const isValidOTP = await verifyOTP(
      null,
      mobileNo,
      uniqueId,
      otp,
      clientId,
      secretId
    );

    if (!isValidOTP?.isOTPVerified) {
      console.log("Invalid OTP entered");
      return { success: false, message: "Invalid OTP" };
    }

    return { success: true, message: "OTP verified successfully" };
  } catch (err) {
    console.log("Error while verifying OTP:", err);
    return { success: false, message: err.message };
  }
}
