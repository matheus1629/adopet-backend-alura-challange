import express from "express";
import adopterRoute from "./adopterRoute.js";
import donorRoute from "./donorRoute.js";
import authRoute from "./authRoute.js";

const router = express.Router();

router.use("/adopter", adopterRoute);
router.use("/donor", donorRoute);
router.use("/auth", authRoute);


export default router;
