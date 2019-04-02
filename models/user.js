'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email_perso: DataTypes.STRING,
    email_ecole: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.TEXT,
    adresse: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    ville_naissance: DataTypes.STRING,
    classeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    
    User.belongsTo(models.Role),

    
    User.belongsTo(models.Classe),
    
    User.belongsToMany(models.Cours, {through: 'bulletins', foreignKey: 'userId', otherKey: 'coursId'});
  };

  return User;
};