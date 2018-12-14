'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bulletin = sequelize.define('Bulletin', {
    note: DataTypes.FLOAT,
    present: DataTypes.TINYINT,
    justificatif: DataTypes.STRING,
    coursId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Bulletin.associate = function(models) {
    // associations can be defined here  
  };

  return Bulletin;
};