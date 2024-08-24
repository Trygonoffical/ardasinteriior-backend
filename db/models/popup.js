'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Popup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Popup.init({
    Img: DataTypes.STRING,
    Link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Popup',
    tableName : 'popups'
  });
  return Popup;
};