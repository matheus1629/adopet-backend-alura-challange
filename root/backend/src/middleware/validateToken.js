import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";


const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default {
  checkToken,
};
