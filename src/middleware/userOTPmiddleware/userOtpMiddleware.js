import otpModel from "../../models/userModels/otpModel";
import {
  OTPgeneValidation,
  varifyOTPValidation,
} from "../../schemaValidate/userAlldataVali/profilerelatedValidation";
import sendOTPEmail from "../../services/OTPservices/mailOTP";
import { verifyOtponMobile } from "../../services/OTPservices/smsOTP";

export const generateOTPmiddleware = async (req, res) => {
  try {
    const { email, mobileNo } = req.body;

    if (!(email && mobileNo)) {
      return res
        .status(400)
        .json({ success: false, message: "Email or MobileNo is required." });
    }

    const otpValidate = OTPgeneValidation.validateAsync({ email, mobileNo });
    let mailOtp, result;

    if (email) {
      mailOtp = Math.floor(100000 + Math.random() * 899999);
      result = await sendOTPEmail(email);
    }

    if (mobileNo) {
      result = await sendOtponMobile(mobileNo, "SMS");
    }

    if (result.success) {
      const otpID = result?.message?.startsWith("Otp")
        ? result?.message
        : false;

      if (mailOtp && email) {
        let expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        const mailfind = await otpModel.findOne({ email });

        if (mailfind) {
          await otpModel.findOneAndUpdate({ email }, { mailOtp, expiresAt });
        } else {
          await otpModel.create({ email, mailOtp, expiresAt });
        }
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully ",
        data: { otpID },
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "OTP not Generated" });
    }
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

export const varifyOtpmiddleware = async (req, res, next) => {
  try {
    const { mobileNo, email, otp, otpID } = req.body;

    if (!(mobileNo && email && otp)) {
      res.status(400).json({
        success: false,
        message: "mobileNo, email or otp is required",
        data: {},
      });
    }

    await varifyOTPValidation.validateAsync({ mobileNo, email, otp, otpID });

    let result;
    if (email) {
        const data=await otpModel.findOne({email}, {mailOtp:1})
        if (data?.mailOtp==otp) {
            result={ success: true,
                message: "otp varification is successfully done",
             }
             await otpModel.findOneAndDelete({email});
        }
    }

    if (mobileNo) {
        const data=await otpModel.findOne({mobileNo}, {mailOtp:1})
       if (!otpID) {
        res.status(400).json({
            success:false,
            message:"otpID is required",
            data:{}
        })
       }
       result= await verifyOtponMobile(mobileNo, otp, otpID)
    }

    if (result?.success) {
        delete req.body.otp;
        delete req.body.otpID;
        return next();
      } else {
        res.status(500).json({ success: false, message: "OTP not Verified" });
      }

} catch (error) { next(error);}
};
