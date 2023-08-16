"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      Donor.hasMany(models.Pet, {
        foreignKey: "id_donor",
      });
      Donor.hasMany(models.Message, {
        foreignKey: "id_donor",
      });
    }
  }
  Donor.init(
    {
      profile_photo: DataTypes.BLOB,
      full_name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Donor",
    }
  );
  return Donor;
};
