"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
