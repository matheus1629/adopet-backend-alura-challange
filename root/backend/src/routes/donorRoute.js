import express from "express";
import donorController from "../controllers/donorController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

// Public Routes
router.get("/", donorController.getAllDonors);
router.get("/:id", donorController.getDonorById);

// Private Routes
router.get(
  "/loggedUser/info",
  validateToken.checkToken("Donor"),
  donorController.getLoggedDonor
);
router.patch(
  "/",
  validateToken.checkToken("Donor"),
  donorController.updateDonor
);
router.delete(
  "/",
  validateToken.checkToken("Donor"),
  donorController.deleteDonor
);

export default router;
