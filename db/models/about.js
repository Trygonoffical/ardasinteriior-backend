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
      type:DataTypes.STRING
    },
    LImg: {
      type:DataTypes.STRING
    },
    topContent: {
      type:DataTypes.TEXT
    },
    whyImg: {
      type: DataTypes.STRING
    },
    whytitle: {
      type: DataTypes.STRING
    },
    whyContent: {
      type: DataTypes.TEXT
    },
    stattitleone: {
      type: DataTypes.STRING
    },
    statcontenteone: {
      type: DataTypes.STRING
    },
    stattitletwo: {
      type: DataTypes.STRING
    },
    statcontentetwo: {
      type: DataTypes.STRING
    },
    stattitlethree: {
      type: DataTypes.STRING
    },
    statcontentethree: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'About',
    tableName: 'abouts',

  });
  return About;
};