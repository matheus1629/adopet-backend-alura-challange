import validateData from "../validation/validateSignupData.js";
import adopterRepository from "../repository/adopterRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import bcryptjs from "bcryptjs";

const getAllAdopters = async () => {
  const adoptersData = await adopterRepository.getAllAdopters();

  for (const key in adoptersData) {
    if (adoptersData[key].dataValues.profilePhoto) {
      adoptersData[key].dataValues.profilePhoto =
        adoptersData[key].dataValues.profilePhoto.toString();
    }
  }

  return adoptersData;
};

const getAdopterById = async (id) => {
  const adopterData = await adopterRepository.getAdopterById(id);
  const adopterDataPhotoString = adopterData.profilePhoto.toString();

  adopterData.profilePhoto = adopterDataPhotoString;

  return adopterData;
};

const createAdopter = async (newAdopter) => {
  const firstNameErrors = validateData.validateFirstName(newAdopter.firstName);
  const lastNameErrors = validateData.validateLastName(newAdopter.lastName);
  const telephoneErrors = validateData.validateTelephone(newAdopter.telephone);
  const cityErrors = validateData.validateCity(newAdopter.city);
  const stateErrors = validateData.validateState(newAdopter.state);
  const personalInfoErrors = validateData.validatePersonalInfo(
    newAdopter.personalInfo
  );
  const emailErrors = validateData.validateEmail(newAdopter.email);
  const passwordErrors = validateData.validatePassword(newAdopter.password);
  const profilePhotoDataErrors = validateData.validatePhotoData(
    newAdopter.profilePhoto
  );

  newDonor.profilePhoto = Buffer.from(newDonor.profilePhoto);
  const profilePhotoSizeErrors = validateData.validatePhotoSize(
    newAdopter.profilePhoto
  );
  
  const hasErrors = [
    ...firstNameErrors,
    ...lastNameErrors,
    ...telephoneErrors,
    ...cityErrors,
    ...stateErrors,
    ...emailErrors,
    ...passwordErrors,
    ...personalInfoErrors,
    ...profilePhotoDataErrors,
    ...profilePhotoSizeErrors,
  ];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const salt = await bcryptjs.genSalt(10);
  newAdopter.password = await bcryptjs.hash(newAdopter.password, salt);

  return await adopterRepository.createAdopter(newAdopter);
};

const updateAdopter = async (newAdopterInfo, id) => {
  const oldAdopter = await getAdopterById(id);

  newAdopterInfo = await { ...oldAdopter.get(), ...newAdopterInfo };
  delete newAdopterInfo.email;
  delete newAdopterInfo.password;
  delete newAdopterInfo.createdAt;
  delete newAdopterInfo.updatedAt;

  const firstNameErrors = validateData.validateFirstName(
    newAdopterInfo.firstName
  );
  const lastNameErrors = validateData.validateLastName(newAdopterInfo.lastName);
  const telephoneErrors = validateData.validateTelephone(
    newAdopterInfo.telephone
  );
  const cityErrors = validateData.validateCity(newAdopterInfo.city);
  const stateErrors = validateData.validateState(newAdopterInfo.state);
  const personalInfoErrors = validateData.validatePersonalInfo(
    newAdopterInfo.personalInfo
  );
  const profilePhotoDataErrors = validateData.validatePhotoData(
    newAdopterInfo.profilePhoto
  );

  newAdopterInfo.profilePhoto = Buffer.from(newAdopterInfo.profilePhoto);
  const profilePhotoSizeErrors = validateData.validatePhotoSize(
    newAdopterInfo.profilePhoto
  );

  const hasErrors = [
    ...firstNameErrors,
    ...lastNameErrors,
    ...telephoneErrors,
    ...cityErrors,
    ...stateErrors,
    ...personalInfoErrors,
    ...profilePhotoDataErrors,
    ...profilePhotoSizeErrors,
  ];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
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
