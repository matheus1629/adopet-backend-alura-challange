import express from "express";
import adopterController from "../controllers/adopterController.js";
import validateEntity from '../middleware/validateEntityId.js'

const router = express.Router();

router.get("/", adopterController.getAllAdopters);
router.get("/:id", validateEntity.checkEntityId("Adopter"), adopterController.getAbopterById);
router.post("/", adopterController.createAbopter);
router.put("/:id", validateEntity.checkEntityId("Adopter"), adopterController.updateAbopter);
router.delete("/:id", validateEntity.checkEntityId("Adopter"), adopterController.deleteAbopter);

export default router;
