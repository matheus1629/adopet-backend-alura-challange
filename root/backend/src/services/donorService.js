import validateData from "../validation/validateSignupData.js";
import donorRepository from "../repository/donorRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";

const getAllDonors = async () => {
  const donorsData = await donorRepository.getAllDonors();

  for (const key in donorsData) {
    if (donorsData[key].dataValues.profilePhoto) {
      donorsData[key].dataValues.profilePhoto =
        donorsData[key].dataValues.profilePhoto.toString();
    }
  }

  return donorsData;
};

const getDonorById = async (id) => {
  const donorData = await donorRepository.getDonorById(id);
  const donorDataPhotoString = donorData.profilePhoto.toString();

  donorData.profilePhoto = donorDataPhotoString;

  return donorData;
};

const createDonor = async (newDonor) => {
  const firstNameErrors = validateData.validateFirstName(newDonor.firstName);
  const lastNameErrors = validateData.validateLastName(newDonor.lastName);
  const telephoneErrors = validateData.validateTelephone(newDonor.telephone);
  const cityErrors = validateData.validateCity(newDonor.city);
  const stateErrors = validateData.validateState(newDonor.state);
  const emailErrors = validateData.validateEmail(newDonor.email);
  const passwordErrors = validateData.validatePassword(newDonor.password);
  const profilePhotoDataErrors = validateData.validatePhotoData(
    newDonor.profilePhoto
  );

  newDonor.profilePhoto = Buffer.from(newDonor.profilePhoto);
  const profilePhotoSizeErrors = validateData.validatePhotoSize(
    newDonor.profilePhoto
  );

  const hasErrors = [
    ...firstNameErrors,
    ...lastNameErrors,
    ...telephoneErrors,
    ...cityErrors,
    ...stateErrors,
    ...emailErrors,
    ...passwordErrors,
    ...profilePhotoSizeErrors,
    ...profilePhotoDataErrors,
  ];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const salt = await bcryptjs.genSalt(10);
  newDonor.password = await bcryptjs.hash(newDonor.password, salt);

  return await donorRepository.createDonor(newDonor);
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
