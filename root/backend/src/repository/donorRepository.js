import database from "../database/models/index.js";

const getAllDonors = async () => {
  return await database.Donor.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

const getDonorById = async (id) => {
  return await database.Donor.findOne({
    where: { id },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
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
  return database.Donor.destroy({
    where: { id },
  });
};

export default {
  getAllPets: getAllDonors,
  getDonorById,
  createDonor,
  updateDonor,
  deleteDonor,
};
