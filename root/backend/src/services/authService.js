import BadRequestError from "../Errors/BadRequestError.js";
import loginRepository from "../repository/loginRepository.js";
import bcryptjs from "bcryptjs";

const login = async (userType, email, password) => {
  const userPasswordHash = await loginRepository.getUserByEmail(userType, email);

  if (!bcryptjs.compareSync(password, userPasswordHash.dataValues.password))
  throw new BadRequestError("Invalid email or password");


};

export default {
  login,
};
