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
      contact_message: DataTypes.STRING,
      idDonor: { type: DataTypes.INTEGER, field: "id_donor" },
      idAdopter: { type: DataTypes.INTEGER, field: "id_adopter" },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
