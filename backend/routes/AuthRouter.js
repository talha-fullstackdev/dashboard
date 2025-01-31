import express from "express";
import { signUpValidation ,loginValidation} from "../middlewares/authValidtion.js";
import signUp from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
const router = express.Router(); 
router.post("/login", loginValidation,login);
router.post("/signup", signUpValidation,signUp)

export default router; 
