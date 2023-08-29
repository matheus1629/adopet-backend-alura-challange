import validateData from "../validation/validateSignupData.js";
import donorRepository from "../repository/donorRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";
import { bufferToBase64 } from "../helpers/buffer.js";

const getAllDonors = async () => {
  const donorsData = await donorRepository.getAllDonors();

  for (const key in donorsData) {
    if (donorsData[key].dataValues.picture) {
      donorsData[key].dataValues.picture = bufferToBase64(
        donorsData[key].dataValues.picture
      );
    }
  }

  return donorsData;
};

const getDonorById = async (id) => {
  if (isNaN(id)) throw new BadRequestError("Invalid id");

  const donorData = await donorRepository.getDonorById(id);

  if (!donorData) throw new BadRequestError("Donor not found");

  if (donorData.dataValues.picture)
    donorData.dataValues.picture = bufferToBase64(donorData.dataValues.picture);

  return donorData.dataValues;
};

const createDonor = async (newDonor) => {
  let errors = [];

  for (const key in newDonor) {
    let error;
    if (key === "picture" && newDonor.picture) {
      const base64Data = newDonor[key].replace(/^data:.*?;base64,/, "");
      newDonor.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newDonor[key]);
    } else {
      error = validateData[key](newDonor[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const salt = await bcryptjs.genSalt(10);
  newDonor.password = await bcryptjs.hash(newDonor.password, salt);

  const donorCreated = await donorRepository.createDonor(newDonor);

  return donorCreated.dataValues.id;
};

const updateDonor = async (newDonorInfo, id) => {
  delete newDonorInfo.email;
  delete newDonorInfo.password;
  delete newDonorInfo.createdAt;
  delete newDonorInfo.updatedAt;
  delete newDonorInfo.id;

  let errors = [];

  for (const key in newDonorInfo) {
    let error;
    if (key === "picture" && newDonorInfo.picture) {
      const base64Data = newDonorInfo[key].replace(/^data:.*?;base64,/, "");
      newDonorInfo.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newDonorInfo[key]);
    } else {
      error = validateData[key](newDonorInfo[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  return await donorRepository.updateDonor(newDonorInfo, id);
};

const deleteDonor = async (id) => {
  return await donorRepository.deleteDonor(id);
};

export default {
  getAllDonors,
  getDonorById,
  createDonor,
  updateDonor,
  deleteDonor,
};
