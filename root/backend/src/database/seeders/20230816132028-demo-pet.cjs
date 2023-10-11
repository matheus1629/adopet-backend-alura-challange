"use strict";

const crypto = require("crypto");

const petId = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

const { adopterId } = require("./20230816124628-demo-adopter.cjs");
const { donorId } = require("./20230816124828-demo-donor.cjs");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pet",
      [
        {
          id: petId[0],
          name: "Maria",
          age: 7,
          size: "Porte pequeno",
          description: "Late muito",
          picture: "",
          adopted: 0,
          id_donor: donorId[1],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: petId[1],
          name: "Miguel",
          age: 3,
          size: "Porte pequeno",
          description: "Brincalhão e carente",
          picture: "",
          adopted: 0,
          id_donor: donorId[2],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: petId[2],
          name: "Katarina",
          age: 4,
          size: "Porte pequeno",
          description: "Calma e tranquila",
          picture: "",
          adopted: 0,
          id_donor: donorId[0],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          name: "Maya",
          age: 2,
          size: "Porte pequeno",
          description: "Agitada",
          picture: "",
          adopted: 1,
          adoption_date: "2023-08-20",
          id_donor: donorId[2],
          id_adopter: adopterId[1],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pet", null, {});
  },
};
