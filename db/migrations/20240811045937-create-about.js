'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('abouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      LImg: {
        type: Sequelize.STRING
      },
      topContent: {
        type: Sequelize.TEXT
      },
      whyImg: {
        type: Sequelize.STRING
      },
      whytitle: {
        type: Sequelize.STRING
      },
      whyContent: {
        type: Sequelize.TEXT
      },
      stattitleone: {
        type: Sequelize.STRING
      },
      statcontenteone: {
        type: Sequelize.STRING
      },
      stattitletwo: {
        type: Sequelize.STRING
      },
      statcontentetwo: {
        type: Sequelize.STRING
      },
      stattitlethree: {
        type: Sequelize.STRING
      },
      statcontentethree: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('abouts');
  }
};