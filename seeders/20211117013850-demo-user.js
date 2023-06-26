"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "newuser",
          password: '$2b$10$I7kKJRUcZ/EsJTvr9nqE4O6MvDw6PCyr0gqW4iIMlXa2yo.oVcMi6',//newpass
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("users", null, {});
    };
  },
};
