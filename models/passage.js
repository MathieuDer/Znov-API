'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passage = sequelize.define('Passage', {
    heure: DataTypes.DATE,
    sortie: DataTypes.BOOLEAN
  }, {});
  Passage.associate = function(models) {
    Passage.belongsTo(models.Badge, {
      foreignKey:{
      allowNull: true
      }
    })
    // associations can be defined here
  };
  return Passage;
};