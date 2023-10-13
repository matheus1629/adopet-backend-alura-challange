import database from "../database/models/index.js";

const getAllPetsAvailable = async (pageSetting) => {
  return await database.Pet.findAll({
    where: { adopted: 0 },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: ["city", "state"],
    },
    ...pageSetting,
  });
};

const getAllPets = async () => {
  return await database.Pet.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: ["city", "state"],
    },
  });
};

const getPetById = async (id) => {
  return await database.Pet.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: ["city", "state"],
    },
  });
};

const getPetsByDonor = async (id) => {
  return await database.Pet.findAll({
    where: { id_donor: id },
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
  let wasDeleted;
  await database.sequelize.transaction(async (transaction) => {
    await database.Message.destroy({ where: { idPet: id } }, { transaction });
    const deletedCount = await database.Pet.destroy({ where: { id, adopted: 0 } }, { transaction });
    wasDeleted = deletedCount;
  });
  return wasDeleted;
};

const validateIfPetBelongsToDonor = async (idPet, idDonor) => {
  return await database.Pet.findOne({
    where: { id: idPet, idDonor: idDonor },
    attributes: ["id"],
  });
};

export default {
  getAllPetsAvailable,
  getAllPets,
  getPetById,
  getPetsByDonor,
  createPet,
  updatePet,
  deletePet,
  validateIfPetBelongsToDonor,
};
