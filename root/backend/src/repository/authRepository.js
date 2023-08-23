import database from "../database/models/index.js";

const getUserByEmail = async (userType, email) => {
  const userPassword = await database[userType].findOne({
    where: { email: email },
    attributes: ["id", "firstName", "lastName", "password"],
  });

  return userPassword;
};

export default {
  getUserByEmail,
};
