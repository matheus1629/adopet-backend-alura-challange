"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Message", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contact_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_adopter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "adopter", key: "id" },
      },
      id_donor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "donor", key: "id" },
      },
      id_pet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "pet", key: "id" },
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
    await queryInterface.dropTable("Message");
  },
};
