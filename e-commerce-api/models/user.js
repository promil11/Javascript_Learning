'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, {
        foreignKey: "userId"
      })

      User.hasMany(models.Order, {
        foreignKey: "userId"
      })

      User.hasMany(models.Review, {
        foreignKey: "productId"
      })

      User.hasOne(models.Cart, {
        foreignKey: "userId"
      })

      User.hasMany(models.PhoneNumber, {
        foreignKey: "userId"
      })

      User.hasMany(models.wishList, {
        foreignKey: "userId"
      })
      
      User.belongsToMany(models.Role, {
        through: "UserRole",
        foreignKey: 'userId',
        as: "role"
      })
    }
  }
  User.init({
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Please enter a username.',
        },
        notEmpty: {
          msg: 'Username cannot be empty.',
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters.',
        },
    },
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address.',
        },
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};