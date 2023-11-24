'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishList.belongsTo(models.User, {
        foreignKey: "userId"
      })

      wishList.belongsTo(models.Product, {
        foreignKey: "productId"
      })
    }
  }
  wishList.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type:DataTypes.INTEGER,
      defaultValue: 1
    },
    isFavorite: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'wishList',
  });
  return wishList;
};