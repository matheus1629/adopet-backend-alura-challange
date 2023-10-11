import donorService from "../services/donorService.js";

const getAllDonors = async (req, res) => {
  try {
    const allDonors = await donorService.getAllDonors();
    return res.status(200).json(allDonors);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getDonorById = async (req, res) => {
  const donorId = req.params.id;

  try {
    const donor = await donorService.getDonorById(donorId);
    return res.status(200).json(donor);
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(404).json(error.message);

    return res.status(500).json(error.message);
  }
};

const getLoggedDonor = async (req, res) => {
  const donorId = await req.userId;

  try {
    const donor = await donorService.getDonorById(donorId);
    return res.status(200).json(donor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateDonor = async (req, res) => {
  const donorId = req.userId;
  const donorData = req.body;

  try {
    await donorService.updateDonor(donorData, donorId);

    const donorNewInfo = await donorService.getDonorById(donorId);

    return res.status(200).json(donorNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteDonor = async (req, res) => {
  const donorId = req.userId;

  try {
    await donorService.deleteDonor(donorId);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  getAllDonors,
  getDonorById,
  getLoggedDonor,
  updateDonor,
  deleteDonor,
};
