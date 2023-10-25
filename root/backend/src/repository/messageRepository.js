import database from "../database/models/index.js";

const createMessage = async (messageData) => {
  return await database.Message.create(messageData);
};

export default {
  createMessage,
};
