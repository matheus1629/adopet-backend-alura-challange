"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Adopter extends Model {
    static associate(models) {
      Adopter.hasMany(models.Message, {
        foreignKey: "id_adopter",
        onDelete: "CASCADE",
      });
      Adopter.hasMany(models.Pet, {
        foreignKey: "idAdopter",
      });
    }
  }
  Adopter.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      phoneNumber: {
        type: DataTypes.STRING,
        field: "phone_number",
      },
      city: {
        type: DataTypes.STRING,
        field: "city",
      },
      state: {
        type: DataTypes.ENUM(
          "AC",
          "AL",
          "AP",
          "AM",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MT",
          "MS",
          "MG",
          "PA",
          "PB",
          "PR",
          "PE",
          "PI",
          "RJ",
          "RN",
          "RS",
          "RO",
          "RR",
          "SC",
          "SP",
          "SE",
          "TO"
        ),
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Adopter",
      paranoid: true,
    }
  );
  return Adopter;
};
