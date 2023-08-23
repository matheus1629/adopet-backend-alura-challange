import database from "../database/models/index.js";

const getAllAdopters = async () => {
  return await database.Adopter.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

const getAdopterById = async (id) => {
  return await database.Adopter.findOne({
    where: { id },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

const createAdopter = async (newAdopter) => {
  return await database.Adopter.create(newAdopter);
};

const updateAdopter = async (adopterData, id) => {
  return await database.Adopter.update(adopterData, {
    where: { id },
  });
};

const deleteAdopter = async (id) => {
  return database.Adopter.destroy({
    where: { id },
  });
};

export default {
  getAllAdopters,
  getAdopterById,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
