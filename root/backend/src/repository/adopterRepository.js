import database from "../database/models/index.js";

const getAllAdopters = async () => {
  return await database.Adopter.findAll({
    attributes: [
      "profilePhoto",
      "firstName",
      "lastName",
      "telephone",
      "city",
      "state",
      "personalInfo",
      "email",
    ],
  });
};

const getAbopterById = async (idAdopter) => {
  return await database.Adopter.findOne({
    where: { id: idAdopter },
    attributes: [
      "profilePhoto",
      "firstName",
      "lastName",
      "telephone",
      "city",
      "state",
      "personalInfo",
      "email",
    ],
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
