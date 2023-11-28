import validateData from "../validation/validateSignupData.js";
import petService from "./petService.js";
import messageRepository from "../repository/messageRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { bufferToBase64 } from "../helpers/buffer.js";

const getMessagesByAdopter = async (idAdopter) => {
  const messagesSendedIdPet = await messageRepository.getMessagesByAdopter(idAdopter);

  const idPets = [];

  for (let idPet of messagesSendedIdPet) {
    idPets.push(idPet.idPet);
  }

  return idPets;
};

const getMessageDetailsById = async (messageId) => {
  const messageDetailsById = await messageRepository.getMessageDetailsById(messageId);

  if (!messageDetailsById) throw new BadRequestError("Message not found", 404);

  messageDetailsById.Pet.picture = bufferToBase64(messageDetailsById.Pet.picture);
  if (messageDetailsById.Adopter.picture)
    messageDetailsById.Adopter.picture = bufferToBase64(messageDetailsById.Adopter.picture);

  return messageDetailsById;
};

const getAllMessagesByDonorPreView = async (
  idDonor,
  pageIndex,
  pageSize,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) => {
  if (!pageIndex) pageIndex = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };

  const { count, rows } = await messageRepository.getAllMessagesByDonorPreview(
    idDonor,
    pageSetting,
    petName,
    adopterDonorName,
    dateOrder,
    adoptionStatus
  );

  for (const key in rows) {
    rows[key].dataValues.Pet.dataValues.picture = bufferToBase64(rows[key].dataValues.Pet.dataValues.picture);
  }

  return { count, rows };
};

const getAllMessagesByAdopterPreview = async (
  idAdopter,
  pageIndex,
  pageSize,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) => {
  if (!pageIndex) pageIndex = 1;
  if (!pageSize || pageSize === 0) pageSize = 10;

  const pageSetting = {
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };

  const { count, rows } = await messageRepository.getAllMessagesByAdopterPreview(
    idAdopter,
    pageSetting,
    petName,
    adopterDonorName,
    dateOrder,
    adoptionStatus
  );

  for (const key in rows) {
    rows[key].dataValues.Pet.dataValues.picture = bufferToBase64(rows[key].dataValues.Pet.dataValues.picture);
  }

  return { count, rows };
};

const createMessage = async (newMessage) => {
  delete newMessage.adoption_status;

  if (!(await petService.checkIfPetExist(newMessage.idPet))) throw new BadRequestError("Pet not found", 404);

  if (await checkIfAdopterAlreadySendedMessage(newMessage.idAdopter, newMessage.idPet))
    throw new BadRequestError("You already send a message about this pet", 403);

  if (await petService.checkIfPetWasAdoped(newMessage.idPet))
    throw new BadRequestError("This pet was already adopted", 403);

  let errors = [];

  for (const key in newMessage) {
    let error;
    if (validateData[key]) error = validateData[key](newMessage[key]);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    const errorMessage = `Validation errors: ${errors.join(", ")}`;
    throw new BadRequestError(errorMessage, 422);
  }

  return await messageRepository.createMessage(newMessage);
};

const updateMessageAdoptionStatus = async (idMessage, adoptionStatus, idPet) => {
  if (!(await petService.checkIfPetExist(idPet))) throw new BadRequestError("Pet not found", 404);

  if (await petService.checkIfPetWasAdoped(idPet))
    throw new BadRequestError("This pet was already adopted.", 403);

  const idAdopterMessage = await messageRepository.getidAdopterByMessage(idMessage);
  if (!idAdopterMessage) throw new BadRequestError("Message not found", 404);

  if (!(await checkIfAdoptionStatusIsPendingConfirmation(idMessage)))
    throw new BadRequestError("You can't update a message that is not 'pending_confirmation'", 404);

  await messageRepository.updateMessageAdoptionStatus(idMessage, adoptionStatus);

  if (adoptionStatus === "DONOR_ACCEPTED") {
    await petService.petAdopted(idPet, idAdopterMessage.idAdopter, new Date());
    await messageRepository.changeOtherMessageAdoptionStatusAlreadyAdopted(idPet, idAdopterMessage.idAdopter);
  }
};

const checkIfAdoptionStatusIsPendingConfirmation = async (idMessage) => {
  const messageAdoptionStatus = await messageRepository.checkIfAdoptionStatusIsPendingConfirmation(idMessage);
  if (messageAdoptionStatus.adoptionStatus === "pending_confirmation") return true;
  return false;
};

const checkIfAdopterAlreadySendedMessage = async (idAdopter, idPet) => {
  if (await messageRepository.checkIfAdopterAlreadySendedMessage(idAdopter, idPet)) return true;
  return false;
};

export default {
  createMessage,
  getMessagesByAdopter,
  getMessageDetailsById,
  getAllMessagesByDonorPreView,
  updateMessageAdoptionStatus,
  getAllMessagesByAdopterPreview,
};
