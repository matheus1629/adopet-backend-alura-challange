"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      Donor.hasMany(models.Message, {
        foreignKey: "id_donor",
        onDelete: "CASCADE",
      });
      Donor.hasMany(models.Pet, {
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
        type: DataTypes.ENUM(
          "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
          "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
          "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
        ),
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "Donor",
      paranoid: true,
    }
  );
  return Donor;
};
