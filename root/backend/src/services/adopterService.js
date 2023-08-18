import validateData from "../validation/validateData.js";
import adopterRepository from "../repository/adopterRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";

const getAllAdopters = async () => {
  return await adopterRepository.getAllAdopters();
};

const getAbopterById = async (idAdopter) => {
  return await adopterRepository.getAbopterById(idAdopter);
};

const createAbopter = async (newAdopter) => {
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

  const hasErrors = [
    ...firstNameErrors,
    ...lastNameErrors,
    ...telephoneErrors,
    ...cityErrors,
    ...stateErrors,
    ...emailErrors,
    ...passwordErrors,
    ...personalInfoErrors,
  ];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  return await adopterRepository.createAbopter(newAdopter);
};

const updateAbopter = async (newAdopterInfo, id) => {
  const oldAdopter = await getAbopterById(id);

  newAdopterInfo = await { ...oldAdopter.get(), ...newAdopterInfo };
  delete newAdopterInfo.email;
  delete newAdopterInfo.password;

  const firstNameErrors = validateData.validateFirstName(
    newAdopterInfo.firstName
  );
  const lastNameErrors = validateData.validateLastName(newAdopterInfo.lastName);
  const telephoneErrors = validateData.validateTelephone(
    newAdopterInfo.telephone
  );
  const cityErrors = validateData.validateCity(newAdopterInfo.city);
  const stateErrors = validateData.validateState(newAdopterInfo.state);

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
