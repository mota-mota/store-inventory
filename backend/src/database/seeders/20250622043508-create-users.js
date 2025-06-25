'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Obtener los IDs de los roles
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Roles WHERE name IN (\'admin\', \'collaborator\')'
    );
    
    const adminRole = roles.find(r => r.name === 'admin');
    const collaboratorRole = roles.find(r => r.name === 'collaborator');

    // Crear usuarios
    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        // Contraseña: Admin123!
        password: await bcrypt.hash('Admin123!', 10),
        roleId: adminRole.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'colab',
        email: 'colab@example.com',
        // Contraseña: Colab123!
        password: await bcrypt.hash('Colab123!', 10),
        roleId: collaboratorRole.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
