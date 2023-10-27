import express from "express";
import messageController from "../controllers/messageController.js";
import validateToken from "../middleware/validateToken.js";
import validateData from "../middleware/validateData.js";

const router = express.Router();

// Private Route
router.get("/donor/preview", validateToken.checkToken("Donor"), messageController.getAllMessagesByDonorPreView);
router.get("/adopter", validateToken.checkToken("Adopter"), messageController.getMessagesByAdopter);
router.post("/", validateToken.checkToken("Adopter"),validateData.clearBody, messageController.createMessage);


export default router;
