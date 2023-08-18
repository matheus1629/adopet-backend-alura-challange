"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      Donor.hasMany(models.Pet, {
        foreignKey: "id_donor",
        onDelete: "CASCADE",
      });
      Donor.hasMany(models.Message, {
        foreignKey: "id_donor",
        onDelete: "CASCADE",
      });
    }
  }
  Donor.init(
    {
      profilePhoto: {
        type: DataTypes.BLOB,
        field: 'profile_photo', // Nome da coluna no banco de dados
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name', // Nome da coluna no banco de dados
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name', // Nome da coluna no banco de dados
      },
      telephone: {
        type: DataTypes.STRING,
        field: 'telephone', // Nome da coluna no banco de dados
      },
      city: {
        type: DataTypes.STRING,
        field: 'city', // Nome da coluna no banco de dados
      },
      state: {
        type: DataTypes.STRING,
        field: 'state', // Nome da coluna no banco de dados
      },
      email: {
        type: DataTypes.STRING,
        field: 'email', // Nome da coluna no banco de dados
      },
      password: {
        type: DataTypes.STRING,
        field: 'password', // Nome da coluna no banco de dados
      },
    },
    {
      sequelize,
      modelName: "Donor",
    }
  );
  return Donor;
};
