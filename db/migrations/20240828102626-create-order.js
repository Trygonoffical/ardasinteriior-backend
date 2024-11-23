'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderID: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      couponInfo: {
        type: Sequelize.JSON,
        allowNull:true
      },
      customerAddress: {
        type: Sequelize.JSON,
        allowNull:true
      },
      proValue: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      subTotal: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      productInfo:{
        type: Sequelize.JSON,
        allowNull: false,
      },
      customerInfo:{
        type: Sequelize.JSON,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false
      },
      paymentID: {
        type: Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('orders');
  }
};