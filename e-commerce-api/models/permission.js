'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: "RolePermission",
        foreignKey: "perId",
        as: 'Roles'
      })
    }
  }
  Permission.init({
    permName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    permDescription: {
      type:DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};