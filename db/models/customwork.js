'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomWork.init({
    email: {
      allowNull: true,
      type:DataTypes.STRING

    },
    name: {
      allowNull: false,
      type:DataTypes.STRING

    },
    details: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    prodImg: {
      allowNull: false,
      type:DataTypes.ARRAY(DataTypes.STRING),

    },
    phone: {
      allowNull: false,
      type:DataTypes.STRING

    }
  }, {
    sequelize,
    modelName: 'CustomWork',
    tableName : 'customWorks'
  });
  return CustomWork;
};