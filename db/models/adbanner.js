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
    Img:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING},
      allowNull: false,
  }, {
    sequelize,
    modelName: 'AdBanners',
  });
  return AdBanner;
};