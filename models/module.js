'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    intitule: DataTypes.STRING
  }, {});
  Module.associate = function(models) {
    Module.hasMany(models.Matiere, {
      as: 'matiere',
      foreignKey:'id',
      constraints: false
    })
    
    // associations can be defined here
  };
  return Module;
};