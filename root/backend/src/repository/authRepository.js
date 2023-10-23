import database from "../database/models/index.js";

const getUserByEmail = async (userType, email) => {
  const userPassword = await database[userType].findOne({
    where: { email },
    attributes: ["id", "password"],
  });

  return userPassword;
};

export default {
  getUserByEmail,
};
