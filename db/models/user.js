// db/models/user.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/db');

class User extends Model {
  // You can define any custom methods for the model here
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: true,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2')
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  paranoid: true,
  freezeTableName: true,
});

module.exports = User;
