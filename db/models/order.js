'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {as: 'orders', foreignKey: 'userId' });
    }
  }
  Order.init({
    orderID: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    couponInfo: {
      type: DataTypes.JSON,
      allowNull:true
    },
    proValue: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    productInfo:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    customerInfo:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    customerAddress:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false
    },
    paymentID: {
      type: DataTypes.STRING,
      allowNull:true
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
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};