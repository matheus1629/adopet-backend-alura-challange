import Router from "express";

import adopterRouter from "./adopterRoute.js";

const router = Router();

router.use("/adopter", adopterRouter);

export default router;
