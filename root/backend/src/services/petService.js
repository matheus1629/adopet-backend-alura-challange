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

  if (!petData) throw new BadRequestError("Pet not found", 404);

  if (petData.dataValues.picture) petData.dataValues.picture = bufferToBase64(petData.dataValues.picture);

  return petData;
};

const getPetByIdAndIdDonor = async (id, idDonor) => {
  if (!(await validateIfPetBelongsToDonor(id, idDonor))) throw new BadRequestError("Pet not found", 404);

  if (await checkIfPetWasAdoped(id))
    throw new BadRequestError("You can't edit a pet that was already adopted", 403);

  const petData = await petRepository.getPetById(id);

  if (petData.dataValues.picture) petData.dataValues.picture = bufferToBase64(petData.dataValues.picture);

  return petData;
};

const getPetsByDonor = async (idDonor, pageIndex, pageSize) => {
  if (!pageIndex) pageIndex = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };

  const { count, rows } = await petRepository.getPetsByDonor(idDonor, pageSetting);

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
    throw new BadRequestError(errorMessage, 422);
  }

  newPet.idDonor = idDonor;

  const petCreated = await petRepository.createPet(newPet);

  return petCreated.dataValues.id;
};

const updatePet = async (newPetInfo, id, idDonor) => {
  delete newPetInfo.adoptionDate;
  delete newPetInfo.adopted;
  delete newPetInfo.idDonor;

  if (!(await validateIfPetBelongsToDonor(id, idDonor)))
    throw new BadRequestError("Pet not found", 404, "IdPetidDonorConflict");

  if (await checkIfPetWasAdoped(id))
    throw new BadRequestError("You can't edit a pet that was already adopted", 403, "CantEditPetAdopted");

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
    throw new BadRequestError(errorMessage, 422);
  }

  return await petRepository.updatePet(newPetInfo, id);
};

const petAdopted = async (idPet, idAdopter, adoptionDate) => {
  await petRepository.petAdopted(idPet, idAdopter, adoptionDate);
};

const deletePet = async (id, donorId) => {
  if (!(await validateIfPetBelongsToDonor(id, donorId))) {
    throw new BadRequestError("Pet not found", 404);
  }

  const wasDeleted = await petRepository.deletePet(id);
  if (wasDeleted === 0) throw new BadRequestError(`You can't delete a pet that was already adopted`, 403);
};

const validateIfPetBelongsToDonor = async (id, idDonor) => {
  if (!(await petRepository.validateIfPetBelongsToDonor(id, idDonor))) return false;
  return true;
};

const checkIfPetWasAdoped = async (id) => {
  const petAdoptedValue = await petRepository.checkIfPetWasAdoped(id);

  if (petAdoptedValue.dataValues.adopted === 1) return true;
  return false;
};

const checkIfPetExist = async (id) => {
  if (await petRepository.checkIfPetExist(id)) return true;
  return false;
};

export default {
  getAllPetsAvailable,
  getAllPet,
  getPetById,
  getPetByIdAndIdDonor,
  getPetsByDonor,
  createPet,
  updatePet,
  petAdopted,
  deletePet,
  checkIfPetWasAdoped,
  validateIfPetBelongsToDonor,
  checkIfPetExist,
};
