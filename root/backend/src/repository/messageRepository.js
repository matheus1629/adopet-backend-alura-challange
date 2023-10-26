import database from "../database/models/index.js";

const getMessagesByAdopter = async (idAdopter) => {
  return await database.Message.findAll({
    where: { idAdopter: idAdopter },
    attributes: ["idPet"],
  });
};

const createMessage = async (newAdopter) => {
  return await database.Message.create(newAdopter);
};

const checkIfAdopterAlreadySendedMessage = async (idAdopter, idPet) => {
  return await database.Message.findOne({
    where: { idAdopter: idAdopter, idPet: idPet },
    attributes: ["id"],
  });
};

export default {
  createMessage,
  checkIfAdopterAlreadySendedMessage,
  getMessagesByAdopter,
};
