'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bar.belongsToMany(models.Foo, {
        through: "foo_bar",
        sourceKey: "title",
        targetKey: "name",
        as: "myFoo"
      })
    }
  }
  Bar.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bar',
  });
  return Bar;
};