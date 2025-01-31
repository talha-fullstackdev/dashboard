import express from "express";
import { signUpValidation } from "../middlewares/authValidtion.js";
import signUp from "../controllers/authController.js";
const router = express.Router(); 
router.post("/login", (req, res) => {
    res.send("Login success");
});
router.post("/signup", signUpValidation,signUp)

export default router; 
