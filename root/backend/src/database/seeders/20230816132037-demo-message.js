"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Message",
      [
        {
          contact_message: "A Maria é vacinada?",
          id_adopter: 3,
          id_donor: 2,
          id_pet: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contact_message:
            "Fiquei interessado na Katarina, caso ainda esteja para adoção, me ligue",
          id_adopter: 2,
          id_donor: 1,
          id_pet: 3,
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
