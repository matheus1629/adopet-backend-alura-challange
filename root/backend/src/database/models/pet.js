import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.Donor, {
        foreignKey: "idDonor",
      });
      Pet.belongsTo(models.Adopter, {
        foreignKey: "idAdopter",
      });
      Pet.hasMany(models.Message, {
        foreignKey: "idPet",
        onDelete: "CASCADE",
      });
    }
  }
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      age: DataTypes.TINYINT.UNSIGNED,
      size: {
        type: DataTypes.ENUM("porte_pequeno", "porte_medio", "porte_grande"),
      },
      description: DataTypes.STRING,
      picture: DataTypes.BLOB("medium"),
      adoptionDate: { type: DataTypes.DATEONLY, field: "adoption_date" },
      adopted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
      idDonor: {
        type: DataTypes.UUID,
        field: "id_donor",
      },
      idAdopter: {
        type: DataTypes.UUID,
        field: "id_adopter",
      },
    },
    {
      sequelize,
      modelName: "Pet",
      defaultScope: {
        attributes: {
          exclude: ["idDonor", "idAdopter", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return Pet;
};
