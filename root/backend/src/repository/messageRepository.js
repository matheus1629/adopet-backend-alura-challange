import database from "../database/models/index.js";

const createMessage = async (newAdopter) => {
  return await database.Message.create(newAdopter);
};

export default {
  createMessage,
};
