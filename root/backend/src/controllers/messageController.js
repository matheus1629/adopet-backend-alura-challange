import messageService from "../services/messageService.js";

const getMessagesByAdopter = async (req, res) => {
  try {
    const messagesByAdopter = await messageService.getMessagesByAdopter(req.userId);

    return res.status(200).send(messagesByAdopter);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createMessage = async (req, res) => {
  const newMessage = req.body;
  newMessage.idAdopter = req.userId;

  try {
    await messageService.createMessage(newMessage);

    return res.status(201).json({ message: "message created" });
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(error.status).json(error.message);
    return res.status(500).json(error.message);
  }
};

export default {
  createMessage,
  getMessagesByAdopter,
};
