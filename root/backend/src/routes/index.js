import express from "express";
import authRoute from "./authRoute.js";
import adopterRoute from "./adopterRoute.js";
import donorRoute from "./donorRoute.js";
import petRoute from "./petRoute.js";
import messageRoute from "./messageRoute.js"

const router = express.Router();

router.use("/auth", authRoute);
router.use("/adopter", adopterRoute);
router.use("/donor", donorRoute);
router.use("/pet", petRoute);
router.use("/message", messageRoute);

export default router;
