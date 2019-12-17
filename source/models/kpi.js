const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Kpi = sequelize.define(
    'kpi',
    {
      name: { type: Sequelize.STRING, allowNull: false, unique : true},
      description: { type: Sequelize.TEXT, allowNull: true },
      status: { type: Sequelize.INTEGER, allowNull: false },
      easeOfMeasure: { type: Sequelize.INTEGER, allowNull: true },
      importance: { type: Sequelize.INTEGER, allowNull: true },

      purpose: { type: Sequelize.TEXT, allowNull: true },
      customers: { type: Sequelize.TEXT, allowNull: true },
      datasources:  { type: Sequelize.TEXT, allowNull: true },
      formula: { type: Sequelize.TEXT, allowNull: true },
      resources:  { type: Sequelize.TEXT, allowNull: true },
      problems: { type: Sequelize.TEXT, allowNull: true },
      targets: { type: Sequelize.TEXT, allowNull: true },
      outcomes: { type: Sequelize.TEXT, allowNull: true },
      cost: { type: Sequelize.TEXT, allowNull: true }
    },
    {}
  );

  Kpi.associate = function(models) {
    models.kpi.belongsTo(models.company, { foreignKey: { allowNull: false } });
    models.kpi.belongsTo(models.user, {
      foreignKey: 'createdByUserId',
      allowNull: false
    });
    models.kpi.belongsTo(models.user, {
      foreignKey: 'definedByUserId',
      allowNull: true
    });
  };

  return Kpi;
};
