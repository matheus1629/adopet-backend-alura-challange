import adopterRepository from "../repository/adopterRepository.js";

const getAllAdopters = async () => {
  return await adopterRepository.getAllAdopters();
};

export default {
  getAllAdopters,
};
