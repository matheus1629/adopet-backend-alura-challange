"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Adopter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adopter.init(
    {
      profile_photo: DataTypes.BLOB,
      full_name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      personal_info: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Adopter",
    }
  );
  return Adopter;
};
