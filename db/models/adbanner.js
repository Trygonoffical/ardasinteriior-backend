'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/db');

module.exports = sequelize.define('adBanners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Img: {
        type: DataTypes.STRING
      },
      link: {
        type: DataTypes.STRING
      },
      section: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
  freezeTableName: true,
  modelName: 'AdBanner',
  tableName: 'adBanners',
})
// module.exports = (sequelize, DataTypes) => {
//   class AdBanner extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   AdBanner.init({
//     Img:{ 
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     section: {
//       type: DataTypes.STRING},
//       allowNull: false,
//   }, {
//     sequelize,
//     modelName: 'AdBanners',
//   });
//   return AdBanner;
// };