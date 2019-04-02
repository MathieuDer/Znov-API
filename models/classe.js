'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classe = sequelize.define('Classe', {
    nom: DataTypes.STRING,
    ecoleId: DataTypes.INTEGER
  }, {});
  Classe.associate = function(models) {
    // associations can be defined here

    Classe.hasMany(models.User),

    Classe.belongsTo(models.Ecole);
    
  };


  return Classe;
};