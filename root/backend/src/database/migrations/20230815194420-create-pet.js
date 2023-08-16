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
      },
      age: {
        type: Sequelize.TINYINT,
      },
      size: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.BLOB,
      },
      id_donor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "donor", key: "id" },
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
