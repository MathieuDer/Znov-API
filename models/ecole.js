'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ecole = sequelize.define('Ecole', {
    nom: DataTypes.STRING
  }, {});
  Ecole.associate = function(models) {
    // associations can be defined here
    Ecole.hasMany(models.Classe, {
      as: 'classe',
      foreignKey:'id',
      constraints: false
    });
  };

  
  return Ecole;
};