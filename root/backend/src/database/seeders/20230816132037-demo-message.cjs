"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Message",
      [
        {
          subject: "Vacinação",
          contact_message: "A Maria é vacinada?",
          id_adopter: "209fcfb4-3a53-4957-9a4c-38a611f8d8fe",
          id_pet: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
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
