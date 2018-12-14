'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      intitule: {
        type: Sequelize.STRING
      },
      debut: {
        type: Sequelize.DATE
      },
      fin: {
        type: Sequelize.DATE
      },
      matiereId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Matieres',
          key:'id'
        }
      },
      salleId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references:{
          model:'Salles',
          key:'id'
        }
      },
      intervenantId: {
        allowNull: true,
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
    return queryInterface.dropTable('Cours');
  }
};