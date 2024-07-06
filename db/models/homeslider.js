'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/db');
module.exports = sequelize.define('HomeSliders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Img: {
        type: DataTypes.STRING
      },
      link: {
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
    }, {
      freezeTableName: true,
      modelName: 'HomeSliders',
    })