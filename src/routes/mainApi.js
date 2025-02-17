import express from "express";
import usersRoutes from "./usersRoutes/usersRoutes";

const router = express.Router();


router.use("/users", usersRoutes)
router.get("/admin", ((req, res)=>res.send("hlee admin")))

const mainApi = router;
export default mainApi;
