'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classe = sequelize.define('Classe', {
    nom: DataTypes.STRING,
    ecoleId: DataTypes.INTEGER
  }, {});
  Classe.associate = function(models) {
    // associations can be defined here
    Classe.hasMany(models.User, {
      as: 'user',
      foreignKey:'id',
      constraints: false
    });
  };


  return Classe;
};