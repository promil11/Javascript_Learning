'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddColumnInUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AddColumnInUser.init({
    deletedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AddColumnInUser',
  });
  return AddColumnInUser;
};