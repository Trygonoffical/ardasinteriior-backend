'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TopBar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TopBar.init({
    content: DataTypes.STRING,
    btntext: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TopBar',
    tableName: 'topBars',
  });
  return TopBar;
};