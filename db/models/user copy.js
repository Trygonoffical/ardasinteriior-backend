'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../../config/db');
module.exports = sequelize.define('Users', {
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
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING
  },
  // confirmPassword:{
  //   type: DataTypes.VIRTUAL,
  //   set(value){
  //     if(value === this.password){
  //       const hashPassword = bcrypt.hashSync('value' , 10)
  //       this.setDataValue('password' , hashPassword);
  //     }else{
  //       throw new Error(
  //         'Password and Confirm Password must be same'
  //       )
  //     }
  //   }
  // },
  userType: {
    type: DataTypes.ENUM('0', '1' ,'2')
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
},{
  paranoid:true,
  freezeTableName: true,
  modelName: 'Users',
})