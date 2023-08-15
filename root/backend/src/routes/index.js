const Router = require("express");
const adopterRouter = require("./adopterRoute.js");

const router = Router();

router.use("/adopter", adopterRouter);

module.exports = router;
