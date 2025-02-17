import express from "express";
import { generateOTP } from "./AlluserRoutes/otpGenerate";

const router = express.Router();


router.post("/otp_generate", generateOTP)
router.post("/login", ((req, res)=>res.send("hlee userds")))
router.post("/signUp", ((req, res)=>res.send("hlee userds")))

const usersRoutes = router;
export default usersRoutes;
