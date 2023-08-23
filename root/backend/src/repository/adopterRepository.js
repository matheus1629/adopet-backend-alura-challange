import database from "../database/models/index.js";

const getAllAdopters = async () => {
  return await database.Adopter.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

const getAbopterById = async (idAdopter) => {
  return await database.Adopter.findOne({
    where: { id: idAdopter },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

const createAbopter = async (newAdopter) => {
  return await database.Adopter.create(newAdopter);
};

const updateAbopter = async (adopterData, id) => {
  return await database.Adopter.update(adopterData, {
    where: { id: id },
  });
};

const deleteAbopter = async (id) => {
  return database.Adopter.destroy({
    where: { id: id },
  });
};

export default {
  getAllAdopters,
  getAbopterById,
  createAbopter,
  updateAbopter,
  deleteAbopter,
};
