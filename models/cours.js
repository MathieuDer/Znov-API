'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cours = sequelize.define('Cours', {
    intitule: DataTypes.DATE,
    debut: DataTypes.DATE,
    fin: DataTypes.DATE
  }, {});
  Cours.associate = function(models) {
    models.Cours.belongsTo(models.Matiere, {
      foreignKey: {
        allowNull: false
      }
    }),
    Cours.hasOne(models.Salle, {
      as: 'salle',
      foreignKey:'id',
      constraints: false
    }),
    Cours.hasMany(models.User, {
      as: 'intervenant',
      foreignKey:'id',
      constraints: false
    }),
    Cours.hasMany(models.Bulletin, {
      as: 'bulletin',
      foreignKey:'id',
      constraints: false
    });
    // associations can be defined here
  };
  return Cours;
};