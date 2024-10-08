'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TabProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TabProduct.init({
    title: {type: DataTypes.STRING, allowNull: false,unique: true,},
    TagName: {type: DataTypes.STRING, allowNull: false,unique: true,}
  }, {
    sequelize,
    modelName: 'TabProduct',
    tableName: 'tabProducts',
  });
  return TabProduct;
};