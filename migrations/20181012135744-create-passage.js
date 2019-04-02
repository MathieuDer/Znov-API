'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Passages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heure: {
        type: Sequelize.DATE
      },
      sortie: {
        type: Sequelize.BOOLEAN
      },
      badgeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Badges',
          key:'id'
        }
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
    return queryInterface.dropTable('Passages');
  }
};