'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeSlider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeSlider.init({
    WImg: { type: DataTypes.STRING},
    MImg: {type: DataTypes.STRING},
    link: {type: DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'HomeSlider',
    tableName: 'homeSliders',
  });
  return HomeSlider;
};