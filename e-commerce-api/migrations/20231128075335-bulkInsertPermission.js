'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const permissionsData = [
      {
        permName: 'ViewProducts',
        permDescription: 'View a list of available products.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ManageOrders',
        permDescription: 'Manage and process customer orders.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'AddToCart',
        permDescription: 'Add products to the shopping cart.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ManageCustomers',
        permDescription: 'View and manage customer information.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ViewSalesReport',
        permDescription: 'Access sales reports and analytics.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'EditProductDetails',
        permDescription: 'Edit details of existing products.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ManageInventory',
        permDescription: 'Manage product inventory and stock.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'CustomerSupport',
        permDescription: 'Provide customer support assistance.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ViewDashboard',
        permDescription: 'Access the admin dashboard.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        permName: 'ManagePromotions',
        permDescription: 'Create and manage promotional campaigns.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
    ]
    await queryInterface.bulkInsert('Permissions', permissionsData, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
