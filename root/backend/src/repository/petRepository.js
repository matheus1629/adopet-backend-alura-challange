import database from "../database/models/index.js";

const getAllPets = async () => {
  return await database.Pet.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

const getPetById = async (id) => {
  return await database.Pet.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

const createPet = async (newPet) => {
  return await database.Pet.create(newPet);
};

const updatePet = async (petData, id) => {
  return await database.Pet.update(petData, {
    where: { id },
  });
};

const deletePet = async (id) => {
  return database.Pet.destroy({
    where: { id },
  });
};

export default {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
