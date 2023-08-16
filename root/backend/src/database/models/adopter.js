"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Adopter extends Model {
    static associate(models) {
      Adopter.hasMany(models.Message, {
        foreignKey: "id_adopter",
      });
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
