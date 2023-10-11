"use strict";

const crypto = require("crypto");


const donorId = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];
exports.donorId = donorId;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Donor",
      [
        {
          id: donorId[0],
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
          id: donorId[1],
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
          id: donorId[2],
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
