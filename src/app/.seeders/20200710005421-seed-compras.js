'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Compras', [
      {
        valor: 100.02,
        percent_cashback: 10,
        cashback: 10,
        status: 'Aprovado',
        revendedores_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        valor: 2152.02,
        percent_cashback: 20,
        cashback: 430.20,
        status: 'Em validação',
        revendedores_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        valor: 1537.95,
        percent_cashback: 15,
        cashback: 230.70,
        status: 'Aprovado',
        revendedores_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
