'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matiere = sequelize.define('Matiere', {
    intitule: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {});
  Matiere.associate = function(models) {
    models.Matiere.belongsTo(models.Module, {
      foreignKey: {
        allowNull: true
      }
    }),
    Matiere.hasMany(models.Cours, {
      as: 'cours',
      foreignKey:'id',
      constraints: false
    });
  }
  return Matiere;
};