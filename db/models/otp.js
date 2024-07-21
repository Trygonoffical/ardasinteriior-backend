'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/db');
module.exports = sequelize.define('otps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      phoneNo: {
        type: DataTypes.STRING
      },
      otpVal: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },{
      freezeTableName: true,
      modelName: 'Otp',
      tableName: 'otps',
    });