"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Adopter extends Model {
    static associate(models) {
      Adopter.hasMany(models.Message, {
        foreignKey: "id_adopter",
        onDelete: "CASCADE",
      });
    }
  }
  Adopter.init(
    {
      profilePhoto: {
        type: DataTypes.BLOB,
        field: "profile_photo",
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
      personalInfo: {
        type: DataTypes.STRING,
        field: "personal_info",
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
      modelName: "Adopter",
    }
  );
  return Adopter;
};
