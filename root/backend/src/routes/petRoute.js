import express from "express";
import petController from "../controllers/petController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", petController.getAllPetsAvailable);
router.get("/all", petController.getAllPets);
router.get("/:id", petController.getPetById);

// Private Route
router.get("/petsData/loggedDonor", validateToken.checkToken("Donor"), petController.getPetsByLoggedDonor);
router.post("/", validateToken.checkToken("Donor"), petController.createPet);
router.patch("/:id", validateToken.checkToken("Donor"), petController.updatePet);
router.delete("/:id", validateToken.checkToken("Donor"), petController.deletePet);

export default router;
