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
        allowNull: true,
        type: Sequelize.STRING
      },
      LImg: {
        allowNull: true,
        type: Sequelize.STRING
      },
      topContent: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      whyImg: {
        allowNull: true,
        type: Sequelize.STRING
      },
      whytitle: {
        allowNull: true,
        type: Sequelize.STRING
      },
      whyContent: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      stattitleone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      statcontenteone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      stattitletwo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      statcontentetwo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      stattitlethree: {
        allowNull: true,
        type: Sequelize.STRING
      },
      statcontentethree: {
        allowNull: true,
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