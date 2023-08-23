import validateData from "../validation/validateSignupData.js";
import donorRepository from "../repository/donorRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";

const getAllDonors = async () => {
  return await donorRepository.getAllDonors();
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
  const oldDonor = await getDonorById(id);

  newDonorInfo = await { ...oldDonor.get(), ...newDonorInfo };
  delete newDonorInfo.email;
  delete newDonorInfo.password;
  delete newDonorInfo.createdAt;
  delete newDonorInfo.updatedAt;

  const firstNameErrors = validateData.validateFirstName(
    newDonorInfo.firstName
  );
  const lastNameErrors = validateData.validateLastName(newDonorInfo.lastName);
  const telephoneErrors = validateData.validateTelephone(
    newDonorInfo.telephone
  );
  const cityErrors = validateData.validateCity(newDonorInfo.city);
  const stateErrors = validateData.validateState(newDonorInfo.state);

  const hasErrors = [
    ...firstNameErrors,
    ...lastNameErrors,
    ...telephoneErrors,
    ...cityErrors,
    ...stateErrors,
  ];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
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
