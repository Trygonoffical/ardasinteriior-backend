'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { as: 'subcategory', foreignKey: 'subcategoryId' });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    MRP: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    offerPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    todaysDeal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    yourSaving: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productGallery: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};