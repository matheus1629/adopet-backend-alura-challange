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
      name: DataTypes.STRING,
      age: DataTypes.TINYINT.UNSIGNED,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
      photo: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
