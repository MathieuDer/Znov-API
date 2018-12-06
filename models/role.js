'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ecole = sequelize.define('Role', {
    nom: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      as: 'user',
      foreignKey:'id',
      constraints: false
    });
  };

  
  return Role;
};