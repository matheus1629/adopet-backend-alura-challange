import express from "express";
import donorController from "../controllers/donorController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", donorController.getAllDonors);
router.get(
  "/:id",
  validateEntity.checkEntityId("Donor"),
  donorController.getDonorById
);
router.put(
  "/:id",
  validateEntity.checkEntityId("Donor"),
  donorController.updateDonor
);
router.delete(
  "/:id",
  validateEntity.checkEntityId("Donor"),
  donorController.deleteDonor
);

// Private Route Test
router.get(
  "/:id/rota-privada",
  validateToken.checkToken,
  donorController.getDonorById
);

export default router;
