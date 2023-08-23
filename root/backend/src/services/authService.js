import BadRequestError from "../Errors/BadRequestError.js";
import loginRepository from "../repository/loginRepository.js";
import bcryptjs from "bcryptjs";
import validateLoginData from "../validation/validateLoginData.js";

const login = async (userType, email, password) => {
  const emailError = validateLoginData.validateEmail(email);
  const passwordError = validateLoginData.validatePassword(password);

  const hasErrors = [...emailError, ...passwordError];

  if (hasErrors.length > 0) {
    const errorMessage = `Validation errors: ${hasErrors.join(", ")}`;
    throw new BadRequestError(errorMessage);
  }

  const user = await loginRepository.getUserByEmail(userType, email);

  if (!user || !bcryptjs.compareSync(password, user.dataValues.password))
    throw new BadRequestError("Invalid email or password");

  return user;
};

export default {
  login,
};
