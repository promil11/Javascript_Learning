'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foo_bar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  foo_bar.init({
    fooName: DataTypes.STRING,
    barTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foo_bar',
  });
  return foo_bar;
};