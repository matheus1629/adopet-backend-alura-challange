import express from "express";
import petController from "../controllers/petController.js";
import validateEntity from "../middleware/validateData.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", petController.getAllPetsAvailable);
router.get("/all", petController.getAllPets);
router.get("/:id", validateEntity.checkEntityId("Pet"), petController.getPetById);

// Private Route
router.post("/", validateToken.checkToken("Donor"), petController.createPet);
router.patch(
  "/:id",
  validateEntity.checkEntityId("Pet"),
  validateToken.checkToken("Donor"),
  petController.updatePet
);
router.delete(
  "/:id",
  validateEntity.checkEntityId("Pet"),
  validateToken.checkToken("Donor"),
  petController.deletePet
);

export default router;
