'use strict';
let slugify = require('slugify')
const {
  Model
} = require('sequelize');
const { optional, options } = require('joi');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(Category, {
        foreignKey: "parentCategoryId",
        as: "subCategories"
      })

      Category.belongsTo(Category, {
        foreignKey: "parentCategoryId",
        as: "parentCategories"
      })

      Category.hasMany(models.Product, {
        foreignKey: "categoryId"
      })
    }
  }
  Category.init({
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.beforeCreate((category, options) => {
    console.log(category.categoryName)
    if (category.categoryName) {
      category.slug = slugify(category.categoryName, { lower: true });
      console.log(category.slug)
    }
  });


  Category.beforeDestroy(async (category, options) => {
    console.log(category.id)
    const childCategories = await Category.findAll({
      where: { 
        parentCategoryId: category.id
      },
    });
    // console.log(childCategories)
    await Promise.all(
      childCategories.map((childCategory) =>
        childCategory.update({ parentCategoryId: category.parentCategoryId })
      )
    );

    // await Category.findOne({
    //   where: {
    //     id: category.id
    //   },
    //   include: [{
    //     model: Model.Product
    //   }]
    // }).then(result=> {
    //   console.log(result)
    // })
    
  });


  return Category;
};