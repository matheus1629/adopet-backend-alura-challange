import database from "../database/models/index.js";

const checkEntityId = (model) => async (req, res, next) => {
  const id = req.params.id;

  const entity = await database[model].findOne({
    where: { id: id },
  });
  if (!entity) {
    return res.status(404).json({ error: "Entity not found" });
  }

  next();
};

export default {
  checkEntityId,
};
