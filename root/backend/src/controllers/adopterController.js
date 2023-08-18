import adopterService from "../services/adopterService.js";

const getAllAdopters = async (req, res) => {
  try {
    const allAdopters = await adopterService.getAllAdopters();
    return res.status(200).json(allAdopters);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAbopterById = async (req, res) => {
  const adopterId = req.params.id;

  try {
    const adopter = await adopterService.getAbopterById(Number(adopterId));
    return res.status(200).json(adopter);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createAbopter = async (req, res) => {
  const newAdopter = req.body;
  
  try {
    const createdAdopter = await adopterService.createAbopter(newAdopter);
    return res.status(201).json(createdAdopter);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json("Internal Server Error");
    }
  }
};

const updateAbopter = async (req, res) => {
  const adopterId = req.params.id;
  const adopterData = req.body;

  try {
    const updatedAdopter = await adopterService.updateAbopter(
      adopterData,
      adopterId
    );
    const adopterNewInfo = await adopterService.getAbopterById(updatedAdopter);
    return res.status(200).json(adopterNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteAbopter = async (req, res) => {
  const adopterId = req.params.id;

  try {
    await adopterService.deleteAbopter(adopterId);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  getAllAdopters,
  getAbopterById,
  createAbopter,
  updateAbopter,
  deleteAbopter,
};
