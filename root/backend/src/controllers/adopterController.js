import adopterService from "../services/adopterService.js";

const getAllAdopters = async (req, res) => {
  try {
    const allAdopters = await adopterService.getAllAdopters();
    return res.status(200).json(allAdopters);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  getAllAdopters,
};
