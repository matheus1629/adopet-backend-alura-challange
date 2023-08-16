import express from "express";
import adopterController from "../controllers/adopterController.js";

const router = express.Router();

router.get("/", adopterController.getAllAdopters);

export default router;
