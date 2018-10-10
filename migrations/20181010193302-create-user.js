'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_perso: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email_ecole: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telephone: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      adresse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_naissance: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ville_naissance: {
        allowNull: false,
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};