import database from "../database/models/index.js";

const getAllAdopters = async () => {
  return await database.Adopter.findAll();
};

export default {
  getAllAdopters,
};
