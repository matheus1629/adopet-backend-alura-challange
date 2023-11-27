import express from "express";
import petController from "../controllers/petController.js";
import validateToken from "../middleware/validateToken.js";
import validateData from "../middleware/validateData.js";

const router = express.Router();

router.get("/", petController.getAllPetsAvailable);

// Private Route
router.get(
  "/petData/:id/loggedDonor",
  validateToken.checkToken("Donor"),
  petController.getPetByIdLoggedDonor
);
router.get("/all/loggedDonor", validateToken.checkToken("Donor"), petController.getPetsByLoggedDonor);
router.post("/", validateToken.checkToken("Donor"), validateData.clearBody, petController.createPet);
router.patch("/:id", validateToken.checkToken("Donor"), validateData.clearBody, petController.updatePet);
router.delete("/:id", validateToken.checkToken("Donor"), petController.deletePet);

export default router;
