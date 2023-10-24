import petService from "../services/petService.js";

const getAllPetsAvailable = async (req, res) => {
  const { pageIndex, pageSize } = req.query;

  try {
    const allPets = await petService.getAllPetsAvailable(Number(pageIndex), Number(pageSize));

    return res.status(200).json(allPets);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllPets = async (req, res) => {
  try {
    const allPets = await petService.getAllPet();

    return res.status(200).json(allPets);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPetById = async (req, res) => {
  const idPet = req.params.id;

  try {
    const pet = await petService.getPetById(idPet);
    return res.status(200).json(pet);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPetByIdLoggedDonor = async (req, res) => {
  const idPet = req.params.id;
  const idDonor = req.userId;

  try {
    const pet = await petService.getPetByIdAndIdDonor(idPet, idDonor);
    return res.status(200).json(pet);
  } catch (error) {
    if (error.message === "Pet not found") return res.status(404).json(error.message);

    if (error.message === "You can't edit a pet that was already adopted")
      return res.status(403).json(error.message);

    return res.status(500).json(error.message);
  }
};

const getPetsByLoggedDonor = async (req, res) => {
  const { pageIndex, pageSize } = req.query;
  const idDonor = req.userId;

  try {
    const pet = await petService.getPetsByDonor(idDonor, Number(pageIndex), Number(pageSize));
    return res.status(200).json(pet);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createPet = async (req, res) => {
  const newPet = req.body;
  const idDonor = req.userId;

  try {
    const createdidPet = await petService.createPet(newPet, idDonor);

    const createdPet = await petService.getPetById(createdidPet);

    return res.status(201).json(createdPet);
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

const updatePet = async (req, res) => {
  const idPet = req.params.id;
  const idDonor = req.userId;
  const petData = req.body;

  try {
    await petService.updatePet(petData, idPet, idDonor);

    const petNewInfo = await petService.getPetById(idPet);

    return res.status(200).json(petNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePet = async (req, res) => {
  const idPet = req.params.id;
  const idDonor = req.userId;

  try {
    await petService.deletePet(idPet, idDonor);
    return res.sendStatus(204);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.status(409).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

export default {
  getAllPetsAvailable,
  getAllPets,
  getPetById,
  getPetByIdLoggedDonor,
  getPetsByLoggedDonor,
  createPet,
  updatePet,
  deletePet,
};
