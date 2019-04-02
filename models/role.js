'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    nom: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here

    Role.hasOne(models.User);
  };

  
  return Role;
};