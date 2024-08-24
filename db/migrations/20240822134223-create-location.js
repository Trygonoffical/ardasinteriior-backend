'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      Address1:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address2:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      City:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      State:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      Country:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      PinCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Active:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('locations');
  }
};