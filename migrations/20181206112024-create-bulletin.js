'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bulletins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.FLOAT
      },
      present: {
        type: Sequelize.TINYINT
      },
      justificatif: {
        allowNull: true,
        type: Sequelize.STRING
      },
      coursId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Cours',
          key:'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
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
    return queryInterface.dropTable('Bulletins');
  }
};