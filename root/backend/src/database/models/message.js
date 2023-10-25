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
      adoptionStatus: {
        type: DataTypes.ENUM("not_started", "pending_confirmation", "adopted"),
        field: "adoption_status",
        defaultValue: "not_started",
      },
      subject: { type: DataTypes.STRING(70), field: "contact_message" },
      contactMessage: { type: DataTypes.STRING(2000), field: "contact_message" },
      idDonor: { type: DataTypes.UUID, field: "id_donor" },
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
