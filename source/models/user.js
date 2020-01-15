/**
 * @ignore
 */
const Sequelize = require('sequelize');

/**
 * TODO
 */
let User =  function(sequelize, DataTypes) {
  var User = sequelize.define(
    'user',
    {
      email: { type: Sequelize.STRING, allowNull: false },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      department: { type: Sequelize.STRING, allowNull: true }
    },
    {}
  );

  User.associate = function(models) {
    models.user.belongsTo(models.company, { foreignKey: { allowNull: false } });
    models.user.belongsTo(models.role, { foreignKey: { allowNull: false } });
  };

  return User;
};

module.exports = User