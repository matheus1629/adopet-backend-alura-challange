import { Op, Sequelize } from "sequelize";
import database from "../database/models/index.js";

const getMessagesByAdopter = async (idAdopter) => {
  return await database.Message.findAll({
    where: { idAdopter: idAdopter },
    attributes: ["idPet"],
  });
};

const getMessageDetailsById = async (messageId) => {
  return await database.Message.findOne({
    where: { id: messageId },
    attributes: { exclude: ["idAdopter"] },
    include: [
      {
        model: database.Pet,
        attributes: {
          exclude: ["idDonor", "idAdopter", "password", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        model: database.Adopter,
        attributes: { exclude: ["id", "password", "createdAt", "updatedAt", "deletedAt"] },
      },
    ],
  });
};

const getAllMessagesByDonorPreview = async (
  idDonor,
  pageSetting,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) => {
  return await database.Message.findAndCountAll({
    attributes: ["id", "date", "adoptionStatus"],
    order: [["date", dateOrder]],
    where: {
      [Op.and]: Sequelize.literal(adoptionStatus ? `adoption_Status = '${adoptionStatus}'` : "true"),
    },
    include: [
      {
        model: database.Pet,
        attributes: ["name", "picture"],
        required: true,
        where: { name: { [Op.like]: `%${petName}%` } },
        include: [
          {
            where: { id: idDonor },
            model: database.Donor,
            attributes: [],
          },
        ],
      },
      {
        model: database.Adopter,
        attributes: ["firstName", "lastName"],
        where: Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("Adopter.first_name"),
            " ",
            Sequelize.col("Adopter.last_name")
          ),
          {
            [Op.like]: `%${adopterDonorName}%`,
          }
        ),
      },
    ],
    ...pageSetting,
  });
};

const getAllMessagesByAdopterPreview = async (
  idAdopter,
  pageSetting,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) => {
  return await database.Message.findAndCountAll({
    attributes: ["id", "date", "adoptionStatus"],
    order: [["date", dateOrder]],
    where: {
      [Op.and]: [
        Sequelize.literal(adoptionStatus ? `adoption_Status = '${adoptionStatus}'` : "true"),
        { idAdopter: idAdopter },
      ],
    },
    include: [
      {
        model: database.Pet,
        attributes: ["name", "picture"],
        required: true,
        where: { name: { [Op.like]: `%${petName}%` } },
        include: [
          {
            model: database.Donor,
            attributes: ["firstName", "lastName"],
            where: Sequelize.where(
              Sequelize.fn(
                "concat",
                Sequelize.col("Pet.Donor.first_name"),
                " ",
                Sequelize.col("Pet.Donor.last_name")
              ),
              {
                [Op.like]: `%${adopterDonorName}%`,
              }
            ),
          },
        ],
      },
    ],
    ...pageSetting,
  });
};

const createMessage = async (newAdopter) => {
  return await database.Message.create(newAdopter);
};

const checkIfAdopterAlreadySendedMessage = async (idAdopter, idPet) => {
  return await database.Message.findOne({
    where: { idAdopter: idAdopter, idPet: idPet },
    attributes: ["id"],
  });
};

export default {
  createMessage,
  checkIfAdopterAlreadySendedMessage,
  getMessageDetailsById,
  getAllMessagesByAdopterPreview,
  getMessagesByAdopter,
  getAllMessagesByDonorPreview,
};
