import express from "express";
import adopterController from "../controllers/adopterController.js";
import validateEntity from '../middleware/checkEntityId.js'

const router = express.Router();

router.get("/", adopterController.getAllAdopters);
router.get("/:id", adopterController.getAbopterById);
router.post("/", adopterController.createAbopter);
router.put("/:id", validateEntity.checkEntityId("Adopter"), adopterController.updateAbopter);
router.delete("/:id", validateEntity.checkEntityId("Adopter"), adopterController.deleteAbopter);

export default router;
