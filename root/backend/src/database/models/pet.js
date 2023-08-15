"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pet.init(
    {
      id_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      age: DataTypes.TINYINT,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
