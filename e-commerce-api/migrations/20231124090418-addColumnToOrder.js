'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Orders',
        'estimatedDeliveryDate',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction }
      );
       await queryInterface.addColumn(
        'Orders',
        'actualDeliveryDate',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Orders',
        'sellerId',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Orders',
        'deliveryBoyId',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Orders',
        'isDelivered',
        {
          type: Sequelize.DataTypes.BOOLEAN,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Orders',
        'isCancelled',
        {
          type: Sequelize.DataTypes.BOOLEAN,
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
      await queryInterface.removeColumn('Orders', 'estimatedDeliveryDate', { transaction });
      await queryInterface.removeColumn('Orders', 'actualDeliveryDate', { transaction });
      await queryInterface.removeColumn('Orders', 'sellerId', { transaction });
      await queryInterface.removeColumn('Orders', 'deliveryBoyId', { transaction });
      await queryInterface.removeColumn('Orders', 'isDelivered', { transaction });
      await queryInterface.removeColumn('Orders', 'isCancelled', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
