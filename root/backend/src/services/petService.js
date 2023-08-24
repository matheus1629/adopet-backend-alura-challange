import validateData from "../validation/validateSignupData.js";
import petRepository from "../repository/petRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";

const getAllPetsAvailable = async (page, pageSize) => {
  if (!page) page = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
console.log(pageSetting)
  const petsData = await petRepository.getAllPetsAvailable(pageSetting);

  for (const key in petsData) {
    if (petsData[key].dataValues.picture) {
      petsData[key].dataValues.picture =
        petsData[key].dataValues.picture.toString();
    }
  }

  return petsData;
};

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
  const wasDeleted = await petRepository.deletePet(id);
  if (wasDeleted === 0)
    throw new BadRequestError(
      `You can't delete a pet that was already adopted`
    );
};

export default {
  getAllPetsAvailable,
  getAllPet,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
