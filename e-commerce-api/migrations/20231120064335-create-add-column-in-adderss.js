'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Addresses',
        'addressLine1',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Addresses',
        'addressLine2',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    
  },

  async down (queryInterface, Sequelize) {
   
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Addresses', 'addressLine1', { transaction });
      await queryInterface.removeColumn('Addresses', 'addressLine2', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

};
