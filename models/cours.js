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

    Cours.belongsToMany(models.User, {through: 'bulletins', foreignKey: 'coursId', otherKey: 'userId'}),


    Cours.belongsTo(models.Matiere)


    Cours.belongsTo(models.Salle);
  };
  return Cours;
};