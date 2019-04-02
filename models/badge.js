'use strict';
module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
    actif: DataTypes.BOOLEAN
  }, {});
  Badge.associate = function(models) {
    // associations can be defined here
    
    Badge.hasMany(models.Passage, {
      as: 'passage',
      foreignKey:'id',
      constraints: false
    }),
    Badge.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };
  return Badge;
};