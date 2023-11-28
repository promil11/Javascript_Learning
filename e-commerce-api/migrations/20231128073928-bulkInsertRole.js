'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesData = [
      {
        roleName: 'Admin',
        roleDescription: 'Administrator with full access.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Manager',
        roleDescription: 'Manager with specific permissions.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Customer',
        roleDescription: 'Regular customer with standard access.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Salesperson',
        roleDescription: 'Salesperson responsible for managing sales.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Support',
        roleDescription: 'Customer support representative.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Marketing',
        roleDescription: 'Marketing team member.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'WarehouseStaff',
        roleDescription: 'Staff responsible for managing warehouse operations.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'Analyst',
        roleDescription: 'Data analyst for business intelligence.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'TechSupport',
        roleDescription: 'Technical support specialist.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
      {
        roleName: 'GuestUser',
        roleDescription: 'Temporary guest user with limited access.',
        createdAt:'2023-11-21 08:08:45',
        updatedAt: '2023-11-21 08:08:45'
      },
    ]
    await queryInterface.bulkInsert('Roles', rolesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
