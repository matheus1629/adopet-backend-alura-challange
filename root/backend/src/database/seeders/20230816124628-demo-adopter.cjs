"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Adopter",
      [
        {
          profile_photo: "",
          full_name: "John Doe",
          telephone: "56846325984",
          city: "São Paulo",
          state: "SP",
          personal_info:
            "celerisque. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Curabitur gravida arcu ac tortor dignissim convallis aenean et. In vitae turpis massa sed elementum. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Ac ut consequat semper viverra nam libero. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Arcu ac tortor dignissim convallis aenean et.",
          email: "john.doe@email.com",
          password: "qweqWe12",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profile_photo: "",
          full_name: "Roberta Maria",
          telephone: "45953258706",
          city: "Blumenau",
          state: "SC",
          personal_info:
            "celerisque. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Curabitur gravida arcu ac tortor dignissim convallis aenean et. In vitae turpis massa sed elementum. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Ac ut consequat semper viverra nam libero. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Arcu ac tortor dignissim convallis aenean et",
          email: "roberta.maria@email.com",
          password: "fgAfgh67",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profile_photo: "",
          full_name: "Carlos Almeida",
          telephone: "8492515675",
          city: "Curitiba",
          state: "PR",
          personal_info:
            "celerisque. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Curabitur gravida arcu ac tortor dignissim convallis aenean et. In vitae turpis massa sed elementum. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Ac ut consequat semper viverra nam libero. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Arcu ac tortor dignissim convallis aenean et.",
          email: "carlos.almeida@email.com",
          password: "vbnvOn45",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Adopter", null, {});
  },
};
