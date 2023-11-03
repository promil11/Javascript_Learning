'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Nodejs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'vuejs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'reactjs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sql databse',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'javascript',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('categories', {}, null)
  }
};
