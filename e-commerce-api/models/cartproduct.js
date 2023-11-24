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

  // cartProduct.afterCreate(async (category, options) => {
  //   const {Product} = sequelize.models
  //   const data = await Product.findOne({
  //     where: {
  //       id: category.productId
  //     }
  //   })
  //   console.log(data.price)
  // })
  return cartProduct;
};