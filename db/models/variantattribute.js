'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ProductVariant, { foreignKey: 'productVariantId' , onDelete: 'CASCADE'});
    }
  }
  VariantAttribute.init({
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productVariants',
        key: 'id'
      }
    },
    attributeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attributeValue: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'VariantAttribute',
    tableName: 'variantAttributes',
  });
  return VariantAttribute;
};