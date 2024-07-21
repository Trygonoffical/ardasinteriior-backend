'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('users', [
      // {
      //   firstName: 'John',
      //   lastName: 'Doe',
      //   email: 'example@example.com',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        firstName: "vikas",
        lastName: "gupta",
        email: "info@trygon.in",
        phone : "8851285655",
        password: bcrypt.hashSync("Trygon@123", 10),
        userType: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      firstName: "Sahil",
      lastName: "Khanna",
      email: "info@ardasinterior.com",
      phone: "9999354235",
      password: bcrypt.hashSync("ardasinterior@1234!", 10),
      userType: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
  }

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('users', null, {});
  }
};
