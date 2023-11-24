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
      Order.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Order.init({
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    orderDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        'initiate',
        'approved',
        'pick order from seller',
        'delivered to mainHub',
        "shipping",
        "ready to dispatched",
        'pick order from hub',
        "delivered to user",
        "cancelled"
      ],
      defaultValue: 'initiate'
  },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estimatedDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    actualDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deliveryBoyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};