'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Role.belongsToMany(models.User, {
        through: "UserRole",
        foreignKey: 'roleId',
        as: "user"
      })

      Role.belongsToMany(models.Permission, {
        through: "RolePermission",
        foreignKey: "roleId",
        as: "permissions"
      })
    }
  }
  Role.init({
    roleName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    roleDescription: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};