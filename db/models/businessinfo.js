'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BusinessInfo.init({
    address:{
      allowNull: true,
      type: DataTypes.TEXT
    },
    email: {
      allowNull: true,
      type:DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type:DataTypes.STRING
    },
    companyName: {
      allowNull: true,
      type:DataTypes.STRING
    },
    logo: {
      allowNull: true,
      type:DataTypes.STRING
    },
    GST: {
      allowNull: true,
      type:DataTypes.STRING
    },
    facebook: {
      allowNull: true,
      type:DataTypes.STRING
    },
    insta: {
      allowNull: true,
      type:DataTypes.STRING
    },
    twitter: {
      allowNull: true,
      type:DataTypes.STRING
    },
    youtube: {
      allowNull: true,
      type:DataTypes.STRING
    },
    linkdin: {
      allowNull: true,
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'BusinessInfo',
  });
  return BusinessInfo;
};