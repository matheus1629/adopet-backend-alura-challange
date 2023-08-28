import database from "../database/models/index.js";

const checkEntityId = (model) => async (req, res, next) => {
  const id = await req.params.id;

  const entity = await database[model].findOne({ where: { id } });

  if (!entity) return res.status(404).json({ error: "Entity not found" });

  next();
};

const checkIfEmailAlreadyExist = (model) => async (req, res, next) => {
  const email = await req.body.email;

  const entity = await database[model].findOne({ where: { email: email } });

  if (entity) return res.status(409).json({ error: "Email already used" });

  next();
};

export default {
  checkEntityId,
  checkIfEmailAlreadyExist,
};
