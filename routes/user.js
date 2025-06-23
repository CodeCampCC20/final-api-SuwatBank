import express from "express";
import { docProfile, updateDoc, updateUser, userProfile } from "../controller/userController.js";
import { authCheckUser, authCheckDoc } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/me",authCheckUser, userProfile);
router.patch("/me/:id",authCheckUser, updateUser);

export default router