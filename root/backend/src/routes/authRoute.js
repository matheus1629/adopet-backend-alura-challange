import express from "express";
import authController from "../controllers/authController.js";


const router = express.Router();

router.post("/signup/adopter", authController.createAbopter);
router.post("/login/adopter", authController.adopterLogin);

export default router;
