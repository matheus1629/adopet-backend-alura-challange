"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Donor",
      [
        {
          id: "55f975f7-2248-4a7c-9afe-a7484af2fe81",
          picture: "",
          first_name: "Isabela",
          last_name: "Oliveira",
          phone_number: "65245698541",
          city: "Brasília",
          state: "DF",
          email: "isabela.oliveira@email.com",
          password: "bdoe4vSEq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fb5bab0a-41fb-4ac5-9f24-5f84f5048bc9",
          picture: "",
          first_name: "João",
          last_name: "Rodriguez",
          phone_number: "3645985215",
          city: "Teresina",
          state: "PI",
          email: "joao.rodri@email.com",
          password: "fsef84gU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ff525a79-ac14-43e3-8afb-5c17974aea47",
          picture: "",
          first_name: "Lara",
          last_name: "da Silva",
          phone_number: "1234265840",
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
