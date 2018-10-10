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
    ville_naissance: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};