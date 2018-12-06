'use strict';
module.exports = (sequelize, DataTypes) => {
  const bulletin = sequelize.define('bulletin', {
    note: DataTypes.FLOAT
  }, {});
  bulletin.associate = function(models) {
    // associations can be defined here
    
  };

  return bulletin;
};