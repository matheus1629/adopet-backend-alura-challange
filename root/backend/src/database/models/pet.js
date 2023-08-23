"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.Donor, {
        foreignKey: "id_donor",
      });
      Pet.belongsTo(models.Adopter, {
        foreignKey: "id_adopter",
      });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.TINYINT.UNSIGNED,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
      photo: DataTypes.BLOB("medium"),
      adoptionDate: { type: DataTypes.DATEONLY, field: "adoption_date" },
      adopted: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
