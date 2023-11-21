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
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
    }
  }
  Product.init({
    productName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    stockQuantity: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    },
    categoryId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};