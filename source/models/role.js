/**
 * @ignore
 */
const Sequelize = require('sequelize');

/**
 * TODO
 */
let Role = function(sequelize, DataTypes) {
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

module.exports = Role