'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/db');
module.exports = sequelize.define('pages', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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
      modelName: 'Page',
      tableName: 'pages',
    })