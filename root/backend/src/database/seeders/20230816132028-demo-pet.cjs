"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pet",
      [
        {
          name: "Maria",
          age: 7,
          size: "Porte pequeno",
          description: "Late muito",
          picture: "",
          adopted: 0,
          id_donor: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miguel",
          age: 3,
          size: "Porte pequeno",
          description: "Brincalhão e carente",
          picture: "",
          adopted: 0,
          id_donor: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Katarina",
          age: 4,
          size: "Porte pequeno",
          description: "Calma e tranquila",
          picture: "",
          adopted: 0,
          id_donor: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Maya",
          age: 2,
          size: "Porte pequeno",
          description: "Agitada",
          picture: "",
          adopted: 1,
          adoption_date: "2023-08-20",
          id_donor: 3,
          id_adopter: 2,
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
