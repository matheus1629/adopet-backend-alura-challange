import adopterRepository from "../repository/adopterRepository.js";

const getAllAdopters = async () => {
  return await adopterRepository.getAllAdopters();
};

const getAbopterById = async (idAdopter) => {
  return await adopterRepository.getAbopterById(idAdopter);
};

const createAbopter = async (newAdopter) => {
  return await adopterRepository.createAbopter(newAdopter);
};

const updateAbopter = async (newAdopterInfo, id) => {
  return await adopterRepository.updateAbopter(newAdopterInfo, id);
};

const deleteAbopter = async (id) => {
  return await adopterRepository.deleteAbopter(id);
};

export default {
  getAllAdopters,
  getAbopterById,
  createAbopter,
  updateAbopter,
  deleteAbopter,
};
