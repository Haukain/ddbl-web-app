const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var KpiDefinition = sequelize.define('kpiDefinition', {
		definedByUserID: { type: Sequelize.INTEGER, allowNull: false
        },
	}, {
	});

	KpiDefinition.associate = function(models) {
		models.kpiDefinition.belongsTo(models.kpi)
	  };

	return KpiDefinition;
};