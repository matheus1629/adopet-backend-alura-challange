"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Adopter, {
        foreignKey: "id_adopter",
      });
      Message.belongsTo(models.Donor, {
        foreignKey: "id_donor",
      });
      Message.belongsTo(models.Pet, {
        foreignKey: "id_pet",
      });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      adoptionStatus: {
        type: DataTypes.ENUM("not_started", "pending_confirmation", "adopted"),
        field: "adoption_status",
        defaultValue: "not_started",
      },
      subject: { type: DataTypes.STRING, field: "subject" },
      contactMessage: { type: DataTypes.STRING, field: "contact_message" },
      idAdopter: { type: DataTypes.UUID, field: "id_adopter" },
      idPet: { type: DataTypes.INTEGER, field: "id_pet" },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
