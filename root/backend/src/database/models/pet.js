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
        foreignKey: "id_pet",
        onDelete: "CASCADE",
      });
    }
  }
  Pet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      age: DataTypes.TINYINT.UNSIGNED,
      size: {
        type: DataTypes.ENUM("Porte pequeno", "Porte medio", "Porte Grande"),
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
    }
  );
  return Pet;
};
