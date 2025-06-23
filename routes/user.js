import express from "express";
import { docProfile, editDoc, updateUser, userProfile } from "../controller/userController.js";
import { authCheckUser, authCheckDoc } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/me",authCheckUser, userProfile);
router.patch("/me",authCheckUser, updateUser);

export default router