import messageService from "../services/messageService.js";

const getMessagesByAdopter = async (req, res) => {
  try {
    const messagesByAdopter = await messageService.getMessagesByAdopter(req.userId);

    return res.status(200).send(messagesByAdopter);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getDonorMessageDetailsById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const idDonor = req.userId;

    const messageDetailsById = await messageService.getDonorMessageDetailsById(messageId, idDonor);

    return res.status(200).send(messageDetailsById);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAdopterMessageDetailsById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const idAdopter = req.userId;

    const messageDetailsById = await messageService.getAdopterMessageDetailsById(messageId, idAdopter);

    return res.status(200).send(messageDetailsById);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllMessagesByDonorPreview = async (req, res) => {
  const { pageIndex, pageSize, petName, adopterDonorName, dateOrder, adoptionStatus } = req.query;

  try {
    const allMessagesByDonorPreView = await messageService.getAllMessagesByDonorPreView(
      req.userId,
      Number(pageIndex),
      Number(pageSize),
      petName,
      adopterDonorName,
      dateOrder,
      adoptionStatus
    );

    return res.status(200).send(allMessagesByDonorPreView);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllMessagesByAdopterPreview = async (req, res) => {
  const { pageIndex, pageSize, petName, adopterDonorName, dateOrder, adoptionStatus } = req.query;

  try {
    const allMessagesByDonorPreView = await messageService.getAllMessagesByAdopterPreview(
      req.userId,
      Number(pageIndex),
      Number(pageSize),
      petName,
      adopterDonorName,
      dateOrder,
      adoptionStatus
    );

    return res.status(200).send(allMessagesByDonorPreView);
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

const updateMessageAdoptionStatus = async (req, res) => {
  try {
    const idMessage = req.params.id;
    const { adoptionStatus, idPet } = req.body;

    await messageService.updateMessageAdoptionStatus(idMessage, adoptionStatus, idPet);
    return res.status(200).json({ message: adoptionStatus });
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(error.status).json(error.message);
    return res.status(500).json(error.message);
  }
};

export default {
  createMessage,
  getMessagesByAdopter,
  getAllMessagesByDonorPreview,
  getAllMessagesByAdopterPreview,
  getDonorMessageDetailsById,
  getAdopterMessageDetailsById,
  updateMessageAdoptionStatus,
};
