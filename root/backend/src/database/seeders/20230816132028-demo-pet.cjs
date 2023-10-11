"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pet",
      [
        {
          id: "bb7a70b1-2240-4bd9-b057-c85a2a1975cf",
          name: "Maria",
          age: 7,
          size: "Porte pequeno",
          description: "Late muito",
          picture: "",
          adopted: 0,
          id_donor: "fb5bab0a-41fb-4ac5-9f24-5f84f5048bc9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c97f167f-6e86-4cc5-8fb4-d13587ef79f9",
          name: "Miguel",
          age: 3,
          size: "Porte pequeno",
          description: "Brincalhão e carente",
          picture: "",
          adopted: 0,
          id_donor: "ff525a79-ac14-43e3-8afb-5c17974aea47",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ecf0883f-bccb-4359-81ff-21411b2edd73",
          name: "Katarina",
          age: 4,
          size: "Porte pequeno",
          description: "Calma e tranquila",
          picture: "",
          adopted: 0,
          id_donor: "55f975f7-2248-4a7c-9afe-a7484af2fe81",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fac2234a-8f14-4a9a-8c37-f9dc89c7d05b",
          name: "Maya",
          age: 2,
          size: "Porte pequeno",
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
