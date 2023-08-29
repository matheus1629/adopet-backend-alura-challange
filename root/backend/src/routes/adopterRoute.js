import express from "express";
import adopterController from "../controllers/adopterController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", adopterController.getAllAdopters);
router.get(
  "/:id",
  adopterController.getAdopterById
);


// Private Route
router.get(
  "/loggedUser/info",
  validateToken.checkToken("Adopter"),
  adopterController.getLoggedAdopter
);
router.patch(
  "/",
  validateToken.checkToken("Adopter"),
  adopterController.updateAdopter
);
router.delete(
  "/",
  validateToken.checkToken("Adopter"),
  adopterController.deleteAdopter
);

export default router;
