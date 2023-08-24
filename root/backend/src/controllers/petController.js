import petService from "../services/petService.js";

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
  
  try {
    const createdPetId = await petService.createPet(newPet);

    const createdPet = await petService.getPetById(createdPetId)

    return res.status(201).json(createdPet);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

const updatePet = async (req, res) => {
  const petId = req.params.id;
  const petData = req.body;

  try {
    await petService.updatePet(petData, Number(petId));

    const petNewInfo = await petService.getPetById(Number(petId));

    return res.status(200).json(petNewInfo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePet = async (req, res) => {
  const petId = req.params.id;

  try {
    await petService.deletePet(Number(petId));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
