'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  About.init({
    title: {
      allowNull: true,
      type:DataTypes.STRING
    },
    LImg: {
      allowNull: true,
      type:DataTypes.STRING
    },
    topContent: {
      allowNull: true,
      type:DataTypes.TEXT
    },
    whyImg: {
      allowNull: true,
      type: DataTypes.STRING
    },
    whytitle: {
      allowNull: true,
      type: DataTypes.STRING
    },
    whyContent: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    stattitleone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    statcontenteone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    stattitletwo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    statcontentetwo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    stattitlethree: {
      allowNull: true,
      type: DataTypes.STRING
    },
    statcontentethree: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'About',
    tableName: 'abouts',

  });
  return About;
};