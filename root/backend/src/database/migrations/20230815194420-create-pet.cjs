"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pet", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      size: {
        type: Sequelize.ENUM("Porte pequeno", "Porte medio", "Porte Grande"),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      picture: {
        type: Sequelize.BLOB("medium"),
        allowNull: false,
      },
      adoption_date: {
        type: Sequelize.DATEONLY,
      },
      adopted: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      id_donor: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "donor", key: "id" },
      },
      id_adopter: {
        type: Sequelize.UUID,
        references: { model: "adopter", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pet");
  },
};
