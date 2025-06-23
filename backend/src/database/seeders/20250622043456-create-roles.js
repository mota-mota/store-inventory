'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        description: 'Administrador del sistema con acceso completo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'collaborator',
        description: 'Colaborador con permisos limitados',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
