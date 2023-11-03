'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert("Postcategories", [
    {
      postId: 1,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      postId: 2,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 3,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 4,
      categoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 6,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 7,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 8,
      categoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 1,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 2,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 3,
      categoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      postId: 4,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
