import express from "express";
import adopterController from "../controllers/adopterController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", adopterController.getAllAdopters);
router.get(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.getAbopterById
);
router.put(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.updateAbopter
);
router.delete(
  "/:id",
  validateEntity.checkEntityId("Adopter"),
  adopterController.deleteAbopter
);

// Private Route Test
router.get(
  "/:id/rota-privada",
  validateToken.checkToken,
  adopterController.getAbopterById
);

export default router;
