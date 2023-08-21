import adopterService from "../services/adopterService.js";
import bcryptjs from "bcryptjs";
import authService from "../services/authService.js";
import BadRequestError from "../Errors/BadRequestError.js";

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

const adopterLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    await authService.login("Adopter", email, password);
    return res.sendStatus(200);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.status(401).json(error.message);
    } else {
      return res.status(500).json("Internal Server Error");
    }
  }
};

export default {
  createAbopter,
  adopterLogin,
};
