import validateData from "../validation/validateSignupData.js";
import petRepository from "../repository/petRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";

const getAllPet = async () => {
  const petsData = await petRepository.getAllPets();

  for (const key in petsData) {
    if (petsData[key].dataValues.picture) {
      petsData[key].dataValues.picture =
        petsData[key].dataValues.picture.toString();
    }
  }

  return petsData;
};

const getPetById = async (id) => {
  const petData = await petRepository.getPetById(id);

  if (petData.dataValues.picture) {
    petData.dataValues.picture = petData.dataValues.picture.toString();
  }

  return petData;
};

const createPet = async (newPet) => {
  delete newPet.adoptionDate;
  delete newPet.adopted;
  delete newPet.idDonor;

  let errors = [];
  for (const key in newPet) {
    const error = validateData[key](newPet[key]);
    if (error) errors.push(error);
  }
  newPet.idDonor = 2;
  
  if (newPet.picture && !errors.includes("File not supported")) {
    newPet.picture = Buffer.from(newPet.picture);
    const error = validateData.validatePictureSize(newPet.picture);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const petCreated = await petRepository.createPet(newPet);

  return petCreated.dataValues.id;
};

const updatePet = async (newPetInfo, id) => {
  delete newPetInfo.adoptionDate;
  delete newPetInfo.adopted;
  delete newPetInfo.createdAt;
  delete newPetInfo.updatedAt;
  delete newPetInfo.id;
  delete newPetInfo.idDonor;
  
  let errors = [];
  for (const key in newPetInfo) {
    const error = validateData[key](newPetInfo[key]);
    if (error) errors.push(error);
  }

  if (newPetInfo.picture && !errors.includes("File not supported")) {
    newPetInfo.picture = Buffer.from(newPetInfo.picture);
    const error = validateData.validatePictureSize(newPetInfo.picture);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  return await petRepository.updatePet(newPetInfo, id);
};

const deletePet = async (id) => {
  return await petRepository.deletePet(id);
};

export default {
  getAllPet,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
