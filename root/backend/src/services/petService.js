import validateData from "../validation/validateSignupData.js";
import petRepository from "../repository/petRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { bufferToBase64 } from "../helpers/buffer.js";

const getAllPetsAvailable = async (pageIndex, pageSize) => {
  if (!pageIndex) pageIndex = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };

  const { count, rows } = await petRepository.getAllPetsAvailable(pageSetting);

  for (const key in rows) {
    if (rows[key].dataValues.picture) {
      rows[key].dataValues.picture = bufferToBase64(rows[key].dataValues.picture);
    }
  }

  return { count, rows };
};

const getAllPet = async () => {
  const petsData = await petRepository.getAllPets();

  for (const key in petsData) {
    if (petsData[key].dataValues.picture) {
      petsData[key].dataValues.picture = bufferToBase64(petsData[key].dataValues.picture);
    }
  }

  return petsData;
};

const getPetById = async (id) => {
  const petData = await petRepository.getPetById(id);

  if (!petData) throw new BadRequestError("Pet not found");

  if (petData.dataValues.picture) petData.dataValues.picture = bufferToBase64(petData.dataValues.picture);

  return petData;
};

const getPetsByDonor = async (id, pageIndex, pageSize) => {
  if (!pageIndex) pageIndex = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };

  const { count, rows } = await petRepository.getPetsByDonor(id, pageSetting);

  for (const key in rows) {
    if (rows[key].dataValues.picture) {
      rows[key].dataValues.picture = bufferToBase64(rows[key].dataValues.picture);
    }
  }

  return { count, rows };
};

const createPet = async (newPet, idDonor) => {
  delete newPet.adoptionDate;
  delete newPet.adopted;

  let errors = [];

  for (const key in newPet) {
    let error;
    if (key === "picture" && newPet.picture) {
      const base64Data = newPet[key].replace(/^data:.*?;base64,/, "");
      newPet.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newPet[key]);
    } else {
      error = validateData[key](newPet[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  newPet.idDonor = idDonor;

  const petCreated = await petRepository.createPet(newPet);

  return petCreated.dataValues.id;
};

const updatePet = async (newPetInfo, idPet, idDonor) => {
  delete newPetInfo.adoptionDate;
  delete newPetInfo.adopted;
  delete newPetInfo.createdAt;
  delete newPetInfo.updatedAt;
  delete newPetInfo.idDonor;

  if (!(await petRepository.validateIfPetBelongsToDonor(idPet, idDonor))) {
    throw new BadRequestError("Pet not found");
  }

  if (await checkIfPetWasAdoped(idPet)) {
    throw new BadRequestError("You can't edit a pet that was already adopted");
  }

  let errors = [];

  for (const key in newPetInfo) {
    let error;
    if (key === "picture" && newPetInfo.picture) {
      const base64Data = newPetInfo[key].replace(/^data:.*?;base64,/, "");
      newPetInfo.picture = Buffer.from(base64Data, "base64");
      error = validateData[key](newPetInfo[key]);
    } else {
      error = validateData[key](newPetInfo[key]);
    }
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  return await petRepository.updatePet(newPetInfo, idPet);
};

const deletePet = async (idPet, idDonor) => {
  if (!(await petRepository.validateIfPetBelongsToDonor(idPet, idDonor))) {
    throw new BadRequestError("Pet not found");
  }

  const wasDeleted = await petRepository.deletePet(idPet);
  if (wasDeleted === 0) throw new BadRequestError(`You can't delete a pet that was already adopted`);
};

const checkIfPetWasAdoped = async (idPet) => {
  const petAdoptedValue = await petRepository.checkIfPetWasAdoped(idPet);

  if (petAdoptedValue.dataValues.adopted === 1) return true;
  return false;
};

export default {
  getAllPetsAvailable,
  getAllPet,
  getPetById,
  getPetsByDonor,
  createPet,
  updatePet,
  deletePet,
};
