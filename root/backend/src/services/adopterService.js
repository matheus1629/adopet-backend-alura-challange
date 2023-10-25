import validateData from "../validation/validateSignupData.js";
import adopterRepository from "../repository/adopterRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";
import { bufferToBase64 } from "../helpers/buffer.js";

const getAllAdopters = async () => {
  const adoptersData = await adopterRepository.getAllAdopters();

  for (const key in adoptersData) {
    if (adoptersData[key].dataValues.picture) {
      adoptersData[key].dataValues.picture = bufferToBase64(adoptersData[key].dataValues.picture);
    }
  }

  return adoptersData;
};

const getAdopterById = async (id) => {
  const adopterData = await adopterRepository.getAdopterById(id);

  if (!adopterData) throw new BadRequestError("Adopter not found", 404);

  if (adopterData.dataValues.picture)
    adopterData.dataValues.picture = bufferToBase64(adopterData.dataValues.picture);

  return adopterData.dataValues;
};

const getAdopterPictureById = async (id) => {
  const adopterData = await adopterRepository.getAdopterPictureById(id);

  if (!adopterData) throw new BadRequestError("Adopter not found", 404);

  if (adopterData.dataValues.picture)
    adopterData.dataValues.picture = bufferToBase64(adopterData.dataValues.picture);

  return adopterData.dataValues;
};

const createAdopter = async (newAdopter) => {
  let errors = [];

  for (const key in newAdopter) {
    let error;
    if (key === "picture" && newAdopter.picture) {
      const base64Data = newAdopter[key].replace(/^data:.*?;base64,/, "");
      newAdopter.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newAdopter[key]);
    } else {
      error = validateData[key](newAdopter[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage, 422);
  }

  const salt = await bcryptjs.genSalt(10);
  newAdopter.password = await bcryptjs.hash(newAdopter.password, salt);

  const adoptedCreated = await adopterRepository.createAdopter(newAdopter);

  return adoptedCreated.dataValues.id;
};

const updateAdopter = async (newAdopterInfo, id) => {
  delete newAdopterInfo.email;
  delete newAdopterInfo.password;

  let errors = [];

  for (const key in newAdopterInfo) {
    let error;
    if (key === "picture" && newAdopterInfo.picture) {
      const base64Data = newAdopterInfo[key].replace(/^data:.*?;base64,/, "");
      newAdopterInfo.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newAdopterInfo[key]);
    } else {
      error = validateData[key](newAdopterInfo[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage, 422);
  }

  return await adopterRepository.updateAdopter(newAdopterInfo, id);
};

const deleteAdopter = async (id) => {
  return await adopterRepository.deleteAdopter(id);
};

export default {
  getAllAdopters,
  getAdopterById,
  getAdopterPictureById,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
