import express from "express";
import petController from "../controllers/petController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", petController.getAllPets);
router.get(
  "/:id",
  validateEntity.checkEntityId("Pet"),
  petController.getPetById
);
router.post('/', petController.createPet)
router.patch(
  "/:id",
  validateEntity.checkEntityId("Pet"),
  petController.updatePet
);
router.delete(
  "/:id",
  validateEntity.checkEntityId("Pet"),
  petController.deletePet
);

// Private Route Test
router.get(
  "/:id/rota-privada",
  validateToken.checkToken,
  petController.getPetById
);

export default router;
