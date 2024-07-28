'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    phoneNo: {type:DataTypes.STRING},
    otpVal: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'otps',
  });
  return Otp;
};