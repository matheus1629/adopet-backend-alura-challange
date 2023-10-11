"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Adopter",
      [
        {
          id: "209fcfb4-3a53-4957-9a4c-38a611f8d8fe",
          picture: "",
          first_name: "John",
          last_name: "Doe",
          phone_number: "56846325984",
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
          id: "54deaca4-6e9c-402f-9e2d-9060ce487f20",
          picture: "",
          first_name: "Roberta",
          last_name: "Maria",
          phone_number: "45953258706",
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
          id: "c4ba5ead-7353-4a27-93aa-7fdae68b7e68",
          picture: "",
          first_name: "Carlos",
          last_name: "Almeida",
          phone_number: "8492515675",
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
