import database from "../database/models/index.js";

const getAllAdopters = async () => await database.Adopter.findAll({});

const getAdopterById = async (id) =>
  await database.Adopter.findOne({
    where: { id },
  });

const getAdopterPictureById = async (id) =>
  await database.Adopter.findOne({
    where: { id },
    attributes: ["picture"],
  });

const createAdopter = async (newAdopter) => await database.Adopter.create(newAdopter);

const updateAdopter = async (adopterData, id) =>
  await database.Adopter.update(adopterData, {
    where: { id },
  });

const deleteAdopter = async (id) =>
  database.sequelize.transaction(async (transaction) => {
    await database.Message.destroy({ where: { idAdopter: id } }, { transaction });

    await database.Adopter.destroy({ where: { id } }, { transaction });
  });

export default {
  getAllAdopters,
  getAdopterById,
  getAdopterPictureById,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
