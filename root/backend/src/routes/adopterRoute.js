import express from "express";
import adopterController from "../controllers/adopterController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", adopterController.getAllAdopters);
router.get(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.getAdopterById
);
router.patch(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.updateAdopter
);
router.delete(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.deleteAdopter
);

// Private Route Test
router.get(
  "/:id/rota-privada",
  validateToken.checkToken,
  adopterController.getAdopterById
);

export default router;
