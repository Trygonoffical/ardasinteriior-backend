'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MenuCat, { as: 'submenus', foreignKey: 'menuId' });
    }
  }
  Submenu.init({
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menuCats',
        key: 'id'
      },
    },
    catIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Submenu',
    tableName : 'submenus'
  });
  return Submenu;
};