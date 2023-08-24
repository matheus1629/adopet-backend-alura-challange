import database from "../database/models/index.js";

const getAllDonors = async () => {
  return await database.Donor.findAll({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
};

const getDonorById = async (id) => {
  return await database.Donor.findOne({
    where: { id },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
};

const createDonor = async (newDonor) => {
  return await database.Donor.create(newDonor);
};

const updateDonor = async (donorData, id) => {
  return await database.Donor.update(donorData, {
    where: { id },
  });
};

const deleteDonor = async (id) => {
  return database.sequelize.transaction(async (transaction) => {
    await database.Message.destroy({ where: { idDonor: id } }, { transaction });
    await database.Pet.destroy(
      { where: { idDonor: id, adopted: 0 } },
      { transaction }
    );

    await database.Donor.destroy({ where: { id } }, { transaction });
  });
};

export default {
  getAllDonors,
  getDonorById,
  createDonor,
  updateDonor,
  deleteDonor,
};
