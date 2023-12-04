import { Op, Sequelize } from "sequelize";
import database from "../database/models/index.js";

const getMessagesByAdopter = async (idAdopter) =>
  await database.Message.findAll({
    where: { idAdopter: idAdopter },
    attributes: ["idPet"],
  });

const getDonorMessageDetailsById = async (id, idDonor) =>
  await database.Message.findOne({
    where: { id },
    attributes: { exclude: ["idAdopter"] },
    include: [
      {
        model: database.Pet,
        where: { idDonor },
      },
      { model: database.Adopter },
    ],
  });

const getAdopterMessageDetailsById = async (id, idAdopter) =>
  await database.Message.findOne({
    where: { id, idAdopter },
    attributes: { exclude: ["idAdopter"] },
    include: [{ model: database.Pet, include: [{ model: database.Donor }] }],
  });

const getAllMessagesByDonorPreview = async (
  idDonor,
  pageSetting,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) =>
  await database.Message.findAndCountAll({
    attributes: ["id", "createdAt", "adoptionStatus"],
    order: [["createdAt", dateOrder]],
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

const getAllMessagesByAdopterPreview = async (
  idAdopter,
  pageSetting,
  petName,
  adopterDonorName,
  dateOrder,
  adoptionStatus
) =>
  await database.Message.findAndCountAll({
    attributes: ["id", "createdAt", "adoptionStatus"],
    order: [["createdAt", dateOrder]],
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

const createMessage = async (newAdopter) => await database.Message.create(newAdopter);

const checkIfAdopterAlreadySendedMessage = async (idAdopter, idPet) =>
  await database.Message.findOne({
    where: { idAdopter: idAdopter, idPet: idPet },
    attributes: ["id"],
  });

const updateMessageAdoptionStatus = async (id, adoptionStatus) => {
  await database.Message.update({ adoptionStatus: adoptionStatus }, { where: { id } });
};

const changeOtherMessageAdoptionStatusAlreadyAdopted = async (idPet, idAdopter) => {
  await database.Message.update(
    { adoptionStatus: "pet_already_adopted" },
    { where: { adoptionStatus: "pending_confirmation", idPet, idAdopter: { [Op.ne]: idAdopter } } }
  );
};

const getidAdopterByMessage = async (id) =>
  await database.Message.findOne({
    where: { id },
    attributes: ["idAdopter"],
  });

const checkIfAdoptionStatusIsPendingConfirmation = async (id) =>
  await database.Message.findOne({
    where: { id },
    attributes: ["adoptionStatus"],
  });

export default {
  getidAdopterByMessage,
  createMessage,
  checkIfAdopterAlreadySendedMessage,
  getDonorMessageDetailsById,
  getAdopterMessageDetailsById,
  getAllMessagesByAdopterPreview,
  getMessagesByAdopter,
  changeOtherMessageAdoptionStatusAlreadyAdopted,
  getAllMessagesByDonorPreview,
  updateMessageAdoptionStatus,
  checkIfAdoptionStatusIsPendingConfirmation,
};
