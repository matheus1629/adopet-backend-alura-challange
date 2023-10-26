import validateData from "../validation/validateSignupData.js";
import petService from "./petService.js";
import messageRepository from "../repository/messageRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";

const getMessagesByAdopter = async (idAdopter) => {
  return await messageRepository.getMessagesByAdopter(idAdopter);
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

const checkIfAdopterAlreadySendedMessage = async (idAdopter, idPet) => {
  if (await messageRepository.checkIfAdopterAlreadySendedMessage(idAdopter, idPet)) return true;
  return false;
};

export default {
  createMessage,
  getMessagesByAdopter,
};
