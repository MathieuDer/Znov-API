'use strict';
module.exports = (sequelize, DataTypes) => {
  const Salle = sequelize.define('Salle', {
    numero: DataTypes.STRING,
    etage: DataTypes.STRING,
    description: DataTypes.STRING,
    batiment: DataTypes.STRING
  }, {});
  Salle.associate = function(models) {
    models.Salle.belongsTo(models.Cours, {
      foreignKey: {
        allowNull: false
      }
    })
    // associations can be defined here
  };
  return Salle;
};