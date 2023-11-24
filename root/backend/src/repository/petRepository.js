import database from "../database/models/index.js";

const getAllPetsAvailable = async (pageSetting) =>
  await database.Pet.findAndCountAll({
    where: { adopted: 0 },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: [ "city", "state"],
    },
    ...pageSetting,
  });

const getAllPets = async () =>
  await database.Pet.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: ["city", "state"],
    },
  });

const getPetById = async (id) =>
  await database.Pet.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: database.Donor,
      attributes: ["firstName", "city", "state"],
    },
  });

const getPetsByDonor = async (idDonor, pageSetting) =>
  await database.Pet.findAndCountAll({
    where: { id_donor: idDonor },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    ...pageSetting,
  });

const createPet = async (newPet) => await database.Pet.create(newPet);

const updatePet = async (petData, id) =>
  await database.Pet.update(petData, {
    where: { id },
  });

const petAdopted = async (id, adopterId, adoptionDate) => {
  await database.Pet.update({ adopterId, adoptionDate, adopted: 1 }, { where: { id } });
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

const validateIfPetBelongsToDonor = async (id, donorId) =>
  await database.Pet.findOne({
    where: { id, idDonor: donorId },
    attributes: ["id"],
  });

const checkIfPetWasAdoped = async (id) =>
  await database.Pet.findOne({
    where: { id },
    attributes: ["adopted"],
  });

const checkIfPetExist = async (id) =>
  await database.Pet.findOne({
    where: { id },
    attributes: ["id"],
  });

export default {
  getAllPetsAvailable,
  getAllPets,
  getPetById,
  getPetsByDonor,
  createPet,
  updatePet,
  petAdopted,
  deletePet,
  validateIfPetBelongsToDonor,
  checkIfPetWasAdoped,
  checkIfPetExist,
};
