'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classe = sequelize.define('User', {
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
  Classe.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Bulletin, {
      as: 'bulletin',
      foreignKey:'id',
      constraints: false
    }),
    User.hasOne(models.Role, {
      as: 'role',
      foreignKey:'id',
      constraints: false
    });
  };

  return Classe;
};