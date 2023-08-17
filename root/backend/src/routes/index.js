import express from "express";
import adopterRoute from "./adopterRoute.js";

const router = express.Router();

router.use("/adopter", adopterRoute);


export default router;
