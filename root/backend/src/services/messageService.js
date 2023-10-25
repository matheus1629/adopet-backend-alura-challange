import validateData from "../validation/validateSignupData.js";
import petService from "./petService.js";
import messageRepository from "../repository/messageRepository.js";
import BadRequestError from "../Errors/BadRequestError.js";

const createMessage = async (newMessage) => {
  delete newMessage.adoption_status;

  const { dataValues } = await petService.getPetById(newMessage.idPet);

  if (!(await petService.validateIfPetBelongsToDonor(newMessage.idPet, dataValues.idDonor)))
    throw new BadRequestError("Pet not found", 404);

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
  console.log(newMessage);
  return await messageRepository.createMessage(newMessage);
};

export default {
  createMessage,
};
