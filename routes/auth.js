import express from "express"
import { loginDoc, loginUser, registerDoc, registerUser } from "../controller/authController.js"
import { loginSchema, registerSchema, validate } from "../validations/validator.js";

const router = express.Router()

router.post("/register/doctor", validate(registerSchema),  registerDoc);
router.post("/login/doctor",validate(loginSchema), loginDoc);
router.post("/register/user", validate(registerSchema), registerUser);
router.post("/login/user",validate(loginSchema), loginUser);


export default router