import express from "express";
import { docProfile } from "../controller/userController.js";

const router = express.Router();


router.get("/me", docProfile)

export default router