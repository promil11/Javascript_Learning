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

  Category.beforeCreate(async (category, options) => {
    console.log(options)
    console.log(category.categoryName)
    if (category.categoryName) {
      const baseSlug = slugify(category.categoryName, { lower: true });
      let slug = baseSlug;
      let count = 1;
  
      slug = await countFunc(slug, baseSlug, count)
      
      category.slug = slug
    }
  });

  async function countFunc(slug, baseSlug, count){
    while (await Category.findOne({ where: { slug: slug }})) {
        slug = `${baseSlug}-${count}`;
        console.log(slug)
        count += 1;
      
    }
    return slug
  }

  Category.beforeDestroy(async (category, options) => {
    console.log(category.id)
    const childCategories = await Category.findAll({
      where: { 
        parentCategoryId: category.id
      },
    });
    await Promise.all(
      childCategories.map((childCategory) =>
        childCategory.update({ parentCategoryId: category.parentCategoryId })
      )
    );
    
  });


  return Category;
};