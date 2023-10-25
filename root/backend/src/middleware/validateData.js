import database from "../database/models/index.js";

const checkIfEmailAlreadyExist = (model) => async (req, res, next) => {
  const email = await req.body.email;

  const entity = await database[model].findOne({
    where: { email },
    paranoid: false,
  });

  if (entity) return res.status(409).json({ error: "Email already used" });

  next();
};

const clearBody = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;
  delete req.body.deletedAt;
  delete req.body.id;

  next();
};

export default {
  checkIfEmailAlreadyExist,
  clearBody,
};
