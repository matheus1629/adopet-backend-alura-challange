import database from "../database/models/index.js";

const getUserByEmail = async (userType, email) =>
  await database[userType].findOne({
    where: { email },
    attributes: ["id", "password"],
  });

export default {
  getUserByEmail,
};
