'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {as: 'location', foreignKey: 'userId' });
    }
  }
  Location.init({
    Type: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    Address1:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address2:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    City:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    State:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Country:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    PinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Active:{
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Location',
    tableName : 'locations'
  });
  return Location;
};