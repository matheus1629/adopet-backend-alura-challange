import petService from "../services/petService.js";

const getAllPetsAvailable = async (req, res) => {
  const { page, pageSize } = req.query;

  try {
    const allPets = await petService.getAllPetsAvailable(Number(page), Number(pageSize));

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
  const petId = req.params.id;

  try {
    const pet = await petService.getPetById(Number(petId));
    return res.status(200).json(pet);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createPet = async (req, res) => {
  const newPet = req.body;
  const idDonor = req.userId;

  try {
    const createdPetId = await petService.createPet(newPet, idDonor);

    const createdPet = await petService.getPetById(createdPetId);

    return res.status(201).json(createdPet);
  } catch (error) {
    if (error.name === "BadRequestError") return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

const updatePet = async (req, res) => {
  const petId = req.params.id;
  const idDonor = req.userId;
  const petData = req.body;

  try {
    await petService.updatePet(petData, Number(petId), idDonor);

    const petNewInfo = await petService.getPetById(Number(petId));

    return res.status(200).json(petNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePet = async (req, res) => {
  const petId = req.params.id;
  const idDonor = req.userId;

  try {
    await petService.deletePet(Number(petId), idDonor);
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
  createPet,
  updatePet,
  deletePet,
};
