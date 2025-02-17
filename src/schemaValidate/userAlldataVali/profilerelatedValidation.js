import Joi from "joi"


const name=Joi.string().min(2).required("name is required")
const mobileNo=Joi.string().required("mobileNo is required")
const email = Joi.string().email().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  })
  const otp = Joi.string().length(4).required().messages({
    'any.required':"otp is required",
    'string.base': 'otp must be a string',
    'string.empty': `otp can't be empty`,
    'string.length': `OTP must be 6 digits`,
  })

  const otpID = Joi.string().allow("", null).messages({
    'string.base': 'otpID must be a string',
  })
  
  const password = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  .required()
  .messages({
    'any.required': 'password is required',
  })


 export const OTPgeneValidation=Joi.object({
    mobileNo,
    email,
  }).xor("mobileNo", "email").messages({
    "object.xor":"provile only one mobileNo or email",
  })

 export const varifyOTPValidation=Joi.object({
    mobileNo,
    email,
    otp, 
    otpID
 }).xor("mobileNo", "email").messages({
    "object.xor":"Provide either mobileNo or Email, but not both or neither"
 })