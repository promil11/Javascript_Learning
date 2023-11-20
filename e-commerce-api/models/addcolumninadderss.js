'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddColumnInAdderss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AddColumnInAdderss.init({
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AddColumnInAdderss',
  });
  return AddColumnInAdderss;
};