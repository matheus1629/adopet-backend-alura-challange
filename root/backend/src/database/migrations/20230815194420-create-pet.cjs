"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      photo: {
        type: Sequelize.BLOB,
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
        type: Sequelize.INTEGER,
        references: { model: "donor", key: "id" },
      },
      id_adopter: {
        type: Sequelize.INTEGER,
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
