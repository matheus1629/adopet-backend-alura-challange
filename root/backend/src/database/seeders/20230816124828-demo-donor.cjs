"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Donor",
      [
        {
          profile_photo: "",
          first_name: "Isabela",
          last_name: "Oliveira",
          telephone: "65245698541",
          city: "Brasília",
          state: "DF",
          email: "isabela.oliveira@email.com",
          password: "bdoe4vSEq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profile_photo: "",
          first_name: "João",
          last_name: "Rodriguez",
          telephone: "3645985215",
          city: "Teresina",
          state: "PI",
          email: "joao.rodri@email.com",
          password: "fsef84gU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profile_photo: "",
          first_name: "Lara",
          last_name: "da Silva",
          telephone: "1234265840",
          city: "Belo Horizonte",
          state: "MG",
          email: "lara.silva@email.com",
          password: "bnmBnm34",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Donor", null, {});
  },
};
