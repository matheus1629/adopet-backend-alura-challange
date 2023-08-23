import adopterService from "../services/adopterService.js";
import authService from "../services/authService.js";
import jwt from "jsonwebtoken";

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
  const { email, password } = req.body;

  try {
    const userLogged = await authService.login("Adopter", email, password);
    const userLoggedData = userLogged.get();

    try {
      const secret = "test";

      const payload = {
        userId: userLoggedData.id,
        firstName: userLoggedData.firstName,
        lastName: userLoggedData.lastName,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "24h" });

      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
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
