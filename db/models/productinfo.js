'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { as: 'productinfos', foreignKey: 'productId' });
    }
  }
  ProductInfo.init({
    title: { type: DataTypes.STRING ,  allowNull: false},
    content:{ type: DataTypes.TEXT ,  allowNull: false},
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ProductInfo',
    tableName: 'productInfos',
  });
  return ProductInfo;
};