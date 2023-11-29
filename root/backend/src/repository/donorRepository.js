import { Op } from "sequelize";
import database from "../database/models/index.js";

const getAllDonors = async () => await database.Donor.findAll({});

const getDonorById = async (id) =>
  await database.Donor.findOne({
    where: { id },
  });

const getDonorPictureById = async (id) =>
  await database.Donor.findOne({
    where: { id },
    attributes: ["picture"],
  });

const createDonor = async (newDonor) => await database.Donor.create(newDonor);

const updateDonor = async (donorData, id) =>
  await database.Donor.update(donorData, {
    where: { id },
  });

const deleteDonor = async (id) =>
  database.sequelize.transaction(async (transaction) => {
    const pets = await database.Pet.findAll({ where: { idDonor: id }, transaction });

    pets.forEach(async (pet) => {
      await database.Message.destroy({ where: { idPet: pet.id }, transaction });
    });

    await database.Pet.destroy({ where: { idDonor: id, adopted: 0 } }, { transaction });

    await database.Donor.destroy({ where: { id } }, { transaction });
  });

export default {
  getAllDonors,
  getDonorById,
  getDonorPictureById,
  createDonor,
  updateDonor,
  deleteDonor,
};
