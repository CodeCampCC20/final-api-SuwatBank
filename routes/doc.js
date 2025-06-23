import express from "express";
import { authCheckUser, authCheckDoc } from "../middlewares/auth.middleware.js";
import { addDocRecord, addHealthRecord, deleteDocRecordId, deleteHealthRecordId } from "../controller/docController.js";

const router = express.Router();

router.post("/",authCheckDoc, addDocRecord);
router.post("/",authCheckDoc, deleteDocRecordId);
router.post("/",authCheckUser, addHealthRecord);
router.delete("/:id",authCheckUser, deleteHealthRecordId);

export default router