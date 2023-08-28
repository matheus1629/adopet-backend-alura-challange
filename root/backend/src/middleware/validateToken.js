import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import database from "../database/models/index.js";

const checkToken = (model) => async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token is required" });

  const tokenIsValid = jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return false;

    req.userId = decoded.userId;
    return true;
  });

  if (!tokenIsValid) return res.status(401).json({ msg: "Invalid token" });

  const user = await database[model].findOne({
    where: { id: req.userId },
    attributes: ["id"],
  });

  if (!user) return res.status(401).json({ msg: "User not found" });

  next();
};

export default {
  checkToken,
};
