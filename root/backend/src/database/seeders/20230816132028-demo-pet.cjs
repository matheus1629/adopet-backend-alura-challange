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
          size: "Pequeno porte",
          description: "Late muito",
          photo: "",
          id_donor: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miguel",
          age: 3,
          size: "Pequeno porte",
          description: "Brincalhão e carente",
          photo: "",
          id_donor: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Katarina",
          age: 4,
          size: "Pequeno porte",
          description: "Calma e tranquila",
          photo: "",
          id_donor: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Maya",
          age: 2,
          size: "Pequeno porte",
          description: "Agitada",
          photo: "",
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
