import messageService from "../services/messageService.js";

const createMessage = async (req, res) => {
  const newMessage = req.body;
  newMessage.idAdopter = req.userId;

  try {
    const createdMessage = await messageService.createMessage(newMessage);

    return res.status(201).json(createdMessage);
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(error.status).json(error.message);
    return res.status(500).json(error.message);
  }
};

export default {
  createMessage,
};
