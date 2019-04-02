'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    intitule: DataTypes.STRING
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
    
    Module.hasMany(models.Matiere)
    
    
  };
  return Module;
};