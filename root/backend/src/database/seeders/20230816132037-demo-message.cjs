"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Message",
      [
        {
          id: "55f975f7-2248-4a7c-9afe-a7484af2fe82",
          subject: "Vacinação",
          contact_message: "A Maria é vacinada?",
          id_adopter: "209fcfb4-3a53-4957-9a4c-38a611f8d8fe",
          id_pet: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "55f975f7-2248-4a7c-9afe-a7484af2fe83",
          subject: "Quero adotar",
          contact_message: "Fiquei interessado na Katarina, caso ainda esteja para adoção, me ligue",
          id_adopter: "209fcfb4-3a53-4957-9a4c-38a611f8d8fe",
          id_pet: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Message", null, {});
  },
};
