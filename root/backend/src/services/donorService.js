import validateData from "../validation/validateSignupData.js";
import donorRepository from "../repository/donorRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";

const getAllDonors = async () => {
  const donorsData = await donorRepository.getAllDonors();

  for (const key in donorsData) {
    if (donorsData[key].dataValues.picture) {
      donorsData[key].dataValues.picture =
        donorsData[key].dataValues.picture.toString();
    }
  }

  return donorsData;
};

const getDonorById = async (id) => {
  const donorData = await donorRepository.getDonorById(id);
 
  if(!donorData) throw new BadRequestError('Donor not found')

  if (donorData.dataValues.picture) {
    donorData.dataValues.picture = await donorData.dataValues.picture.toString();
  }

  return donorData.dataValues;
};

const createDonor = async (newDonor) => {
  let errors = [];
  for (const key in newDonor) {
    const error = validateData[key](newDonor[key]);
    if (error) errors.push(error);
  }

  if (newDonor.picture && !errors.includes("File not supported")) {
    newDonor.picture = Buffer.from(newDonor.picture);
    const error = validateData.validatePictureSize(newDonor.picture);
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
    const error = validateData[key](newDonorInfo[key]);
    if (error) errors.push(error);
  }

  if (newDonorInfo.picture && !errors.includes("File not supported")) {
    newDonorInfo.picture = Buffer.from(newDonorInfo.picture);
    const error = validateData.validatePictureSize(newDonorInfo.picture);
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
