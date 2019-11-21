const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define(
    'role',
    {
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true }
    },
    {}
  );
  return Role;
};
