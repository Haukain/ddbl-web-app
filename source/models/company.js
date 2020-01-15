/**
 * @ignore
 */
const Sequelize = require('sequelize');

/**
 * TODO
 */
let Company = function(sequelize, DataTypes) {
  var Company = sequelize.define(
    'company',
    {
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true }
    },
    {}
  );
  return Company;
};

module.exports = Company