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
      picture: {
        type: DataTypes.BLOB("medium"),
        field: "picture",
      },
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
      },
      telephone: {
        type: DataTypes.STRING,
        field: "telephone",
      },
      city: {
        type: DataTypes.STRING,
        field: "city",
      },
      state: {
        type: DataTypes.STRING,
        field: "state",
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
      },
    },
    {
      sequelize,
      modelName: "Donor",
    }
  );
  return Donor;
};
