import express from "express";
import { docProfile, editDoc} from "../controller/userController.js";
import { authCheckDoc } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me",authCheckDoc, docProfile);
router.patch("/me",authCheckDoc, editDoc);

export default router