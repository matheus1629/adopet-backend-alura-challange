"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.Donor, {
        foreignKey: "id_donor",
      });
    }
  }
  Pet.init(
    {
      id_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      age: DataTypes.TINYINT,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
