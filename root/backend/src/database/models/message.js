"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Adopter, {
        foreignKey: "idAdopter",
      });
      Message.belongsTo(models.Pet, {
        foreignKey: "idPet",
      });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      adoptionStatus: {
        type: DataTypes.ENUM(
          "pending_confirmation",
          "donor_accepted",
          "donor_refused",
          "pet_already_adopted"
        ),
        field: "adoption_status",
        defaultValue: "pending_confirmation",
      },
      subject: { type: DataTypes.STRING, field: "subject" },
      contactMessage: { type: DataTypes.STRING, field: "contact_message" },
      idAdopter: { type: DataTypes.UUID, field: "id_adopter" },
      idPet: { type: DataTypes.INTEGER, field: "id_pet" },
    },
    {
      sequelize,
      modelName: "Message",
      defaultScope: {
        attributes: {
          exclude: ["idAdopter"],
        },
      },
    }
  );
  return Message;
};
