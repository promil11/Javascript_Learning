'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartProduct.belongsTo(models.Cart, {
        foreignKey: "cartId"
      })

      cartProduct.belongsTo(models.Product, {
        foreignKey: "productId"
      })
    }
  }
  cartProduct.init({
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'cartProduct',
  });

  let totalPrice = 0

  return cartProduct;
};