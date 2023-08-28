import adopterService from "../services/adopterService.js";

const getAllAdopters = async (req, res) => {
  try {
    const allAdopters = await adopterService.getAllAdopters();
    return res.status(200).json(allAdopters);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAdopterById = async (req, res) => {
  const adopterId = req.params.id;

  try {
    const adopter = await adopterService.getAdopterById(Number(adopterId));
    return res.status(200).json(adopter);
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(404).json(error.message);

    return res.status(500).json(error.message);
  }
};

const updateAdopter = async (req, res) => {
  const adopterId = req.params.id;
  const adopterData = req.body;

  try {
    await adopterService.updateAdopter(adopterData, Number(adopterId));

    const adopterNewInfo = await adopterService.getAdopterById(
      Number(adopterId)
    );

    return res.status(200).json(adopterNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteAdopter = async (req, res) => {
  const adopterId = req.params.id;

  try {
    await adopterService.deleteAdopter(Number(adopterId));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  getAllAdopters,
  getAdopterById,
  updateAdopter,
  deleteAdopter,
};
