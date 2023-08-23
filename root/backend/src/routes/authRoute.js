import express from "express";
import authController from "../controllers/authController.js";
import validateEntity from "../middleware/validateData.js";

const router = express.Router();

router.post(
  "/signup/adopter",
  validateEntity.checkIfEmailAlreadyExist("Adopter"),
  authController.createUser("Adopter")
);
router.post("/signin/adopter", authController.userLogin("Adopter"));

router.post(
  "/signup/donor",
  validateEntity.checkIfEmailAlreadyExist("Donor"),
  authController.createUser("Donor")
);
router.post("/signin/donor", authController.userLogin("Donor"));

export default router;
