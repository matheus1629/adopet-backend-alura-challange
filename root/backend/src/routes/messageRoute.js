import express from "express";
import messageController from "../controllers/messageController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

// Private Route
router.post("/", validateToken.checkToken("Adopter"), messageController.createMessage);


export default router;
