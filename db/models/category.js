'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category, { as: 'subcategories', foreignKey: 'parentId' });
      this.belongsTo(models.Category, { as: 'parentCategory', foreignKey: 'parentId' });
    }
  }
  Category.init({
    name: {type:DataTypes.STRING},
    Img: {type:DataTypes.STRING},
    slug: {type:DataTypes.STRING},
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  });
  return Category;
};