import express from "express";

const router = express.Router();


router.get("/users", ((req, res)=>res.send("hlee userds")))
router.get("/admin", ((req, res)=>res.send("hlee admin")))

const mainApi = router;
export default mainApi;
