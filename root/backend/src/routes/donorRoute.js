import express from "express";
import donorController from "../controllers/donorController.js";
import validateToken from "../middleware/validateToken.js";
import validateData from "../middleware/validateData.js";

const router = express.Router();

// Private Routes
router.get("/loggedUser/info", validateToken.checkToken("Donor"), donorController.getLoggedDonor);
router.get("/loggedUser/picture", validateToken.checkToken("Donor"), donorController.getLoggedDonorPicture);
router.patch("/", validateToken.checkToken("Donor"), validateData.clearBody, donorController.updateDonor);
router.delete("/", validateToken.checkToken("Donor"), donorController.deleteDonor);

export default router;
