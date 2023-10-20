import database from "../database/models/index.js";

const checkIfEmailAlreadyExist = (model) => async (req, res, next) => {
  const email = await req.body.email;

  const entity = await database[model].findOne({ where: { email: email } });

  if (entity) return res.status(409).json({ error: "Email already used" });

  next();
};

export default {
  checkIfEmailAlreadyExist,
};
