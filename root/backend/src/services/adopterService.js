import validateData from "../validation/validateSignupData.js";
import adopterRepository from "../repository/adopterRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";

const getAllAdopters = async () => {
  const adoptersData = await adopterRepository.getAllAdopters();

  for (const key in adoptersData) {
    if (adoptersData[key].dataValues.picture) {
      adoptersData[key].dataValues.picture =
        adoptersData[key].dataValues.picture.toString();
    }
  }

  return adoptersData;
};

const getAdopterById = async (id) => {
  const adopterData = await adopterRepository.getAdopterById(id);

  if (adopterData.dataValues.picture) {
    adopterData.dataValues.picture = await adopterData.dataValues.picture.toString();
  }

  return adopterData.dataValues;
};

const createAdopter = async (newAdopter) => {
  let errors = [];
  for (const key in newAdopter) {
    const error = validateData[key](newAdopter[key]);
    if (error) errors.push(error);
  }

  if (newAdopter.picture && !errors.includes("File not supported")) {
    newAdopter.picture = Buffer.from(newAdopter.picture);
    const error = validateData.validatePictureSize(newAdopter.picture);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const salt = await bcryptjs.genSalt(10);
  newAdopter.password = await bcryptjs.hash(newAdopter.password, salt);

  const adoptedCreated = await adopterRepository.createAdopter(newAdopter);

  return adoptedCreated.dataValues.id;
};

const updateAdopter = async (newAdopterInfo, id) => {
  delete newAdopterInfo.email;
  delete newAdopterInfo.password;
  delete newAdopterInfo.createdAt;
  delete newAdopterInfo.updatedAt;
  delete newAdopterInfo.id;

  let errors = [];
  for (const key in newAdopterInfo) {
    const error = validateData[key](newAdopterInfo[key]);
    if (error) errors.push(error);
  }

  if (newAdopterInfo.picture && !errors.includes("File not supported")) {
    newAdopterInfo.picture = Buffer.from(newAdopterInfo.picture);
    const error = validateData.validatePictureSize(newAdopterInfo.picture);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  return await adopterRepository.updateAdopter(newAdopterInfo, id);
};

const deleteAdopter = async (id) => {
  return await adopterRepository.deleteAdopter(id);
};

export default {
  getAllAdopters,
  getAdopterById,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
