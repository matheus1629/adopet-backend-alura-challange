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
          size: "porte_pequeno",
          description: "Late muito",
          picture: "",
          adopted: 0,
          id_donor: "fb5bab0a-41fb-4ac5-9f24-5f84f5048bc9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miguel",
          age: 3,
          size: "porte_pequeno",
          description: "Brincalhão e carente",
          picture: "",
          adopted: 0,
          id_donor: "ff525a79-ac14-43e3-8afb-5c17974aea47",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Katarina",
          age: 4,
          size: "porte_pequeno",
          description: "Calma e tranquila",
          picture: "",
          adopted: 0,
          id_donor: "55f975f7-2248-4a7c-9afe-a7484af2fe81",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Maya",
          age: 2,
          size: "porte_pequeno",
          description: "Agitada",
          picture: "",
          adopted: 1,
          adoption_date: "2023-08-20",
          id_donor: "ff525a79-ac14-43e3-8afb-5c17974aea47",
          id_adopter: "54deaca4-6e9c-402f-9e2d-9060ce487f20",
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
