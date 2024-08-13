'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertHelp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpertHelp.init({
    email: {
      allowNull: true,
      type:DataTypes.STRING
    },
    name: {
      allowNull: false,
      type:DataTypes.STRING
    },
    pincode: {
      allowNull: true,
      type:DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ExpertHelp',
    tableName : 'expertHelps'

  });
  return ExpertHelp;
};