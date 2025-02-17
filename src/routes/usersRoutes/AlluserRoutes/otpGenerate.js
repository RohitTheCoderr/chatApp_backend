import { Router } from "express"
import { checkingExist } from "../../../controllers/userProfileController/userProfilecontroller"
import { generateOTPmiddleware } from "../../../middleware/userOTPmiddleware/userOtpMiddleware"

 Router.route("/").post(checkingExist, generateOTPmiddleware)

 export const generateOTP=Router