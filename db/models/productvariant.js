'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId' });
      this.hasMany(models.VariantAttribute, { foreignKey: 'productVariantId' });
    }
  }
  ProductVariant.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    variantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MRP: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    offerPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productGallery: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ProductVariant',
    tableName: 'productVariants',
  });
  return ProductVariant;
};