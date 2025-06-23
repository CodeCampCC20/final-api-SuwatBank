import express from "express";
import { docProfile, updateDoc} from "../controller/userController.js";
import { authCheckDoc } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me",authCheckDoc, docProfile);
router.patch("/me/:id",authCheckDoc, updateDoc);

export default router