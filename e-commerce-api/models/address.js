'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Address.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    typeAddress: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    pinCode: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    addressLine1: {
      type:DataTypes.STRING,
      allowNull: false
    },
    addressLine2: {
      type:DataTypes.STRING,
      allowNull: true
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};