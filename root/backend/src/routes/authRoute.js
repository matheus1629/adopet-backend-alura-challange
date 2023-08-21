import express from "express";
import authController from "../controllers/authController.js";
import validateEntity from "../middleware/validateData.js";

const router = express.Router();

router.post(
  "/signup/adopter",
  validateEntity.checkIfEmailAlreadyExist("Adopter"),
  authController.createAbopter
);
router.post("/login/adopter", authController.adopterLogin);

export default router;
