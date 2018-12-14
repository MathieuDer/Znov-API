'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cours = sequelize.define('Cours', {
    intitule: DataTypes.STRING,
    debut: DataTypes.DATE,
    fin: DataTypes.DATE,
    matiereId: DataTypes.INTEGER,
    salleId: DataTypes.INTEGER,
    intervenantId: DataTypes.INTEGER
  }, {});
  Cours.associate = function(models) {
    // associations can be defined here
    Cours.hasOne(models.Salle, {
      as: 'salle',
      foreignKey:'id',
      constraints: false
    }),
    Cours.hasOne(models.User, {
      as: 'intervenant',
      foreignKey:'id',
      constraints: false
    }),
    models.Cours.hasMany(models.Bulletin, {
      as: 'bulletin',
      foreignKey:'id',
      constraints: false
    });
  };
  return Cours;
};