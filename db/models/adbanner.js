'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdBanner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdBanner.init({
    WImg: DataTypes.STRING,
    MImg: DataTypes.STRING,
    link: DataTypes.STRING,
    section: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdBanner',
    tableName: 'adBanners',
  });
  return AdBanner;
};