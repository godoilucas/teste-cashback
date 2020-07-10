'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL(7,2)
      },
      percent_cashback: {
        type: Sequelize.FLOAT
      },
      cashback: {
        type: Sequelize.DECIMAL(7,2)
      },
      status: {
        type: Sequelize.STRING
      },
      revendedores_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Revendedores', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Compras');
  }
};