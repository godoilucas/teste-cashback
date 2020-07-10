'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Revendedores', [
      {
        nome: 'João do Teste',
        cpf: '15350946056',
        email: 'joao@joao.com.br',
        senha: '$2a$12$wRaKEtoV4po26bnU9nPPdumhNIUZN/8cAQ6hIWaRhqnxevlOwKzW.', //joao123
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria Teste',
        cpf: '10375956026',
        email: 'maria@maria.com.br',
        senha: '$2a$12$C8nhGt.5TpX/VHy.WymDXuEHWoCwcvKuK8H3H1j2UiQo6cp17LQlC', //maria123
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Revendedores', null, {});
  }
};
