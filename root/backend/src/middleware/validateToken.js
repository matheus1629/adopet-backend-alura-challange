import jwt from "jsonwebtoken";

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const secret = "test";

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default {
  checkToken,
};
