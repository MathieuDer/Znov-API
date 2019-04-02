'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matiere = sequelize.define('Matiere', {
    intitule: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {});
  Matiere.associate = function(models) {
    
    Matiere.belongsTo(models.Module),

    Matiere.hasMany(models.Cours);
  }
  return Matiere;
};