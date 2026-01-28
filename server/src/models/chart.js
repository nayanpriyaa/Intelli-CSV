const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chart = sequelize.define('Chart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dashboardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dashboards',
      key: 'id',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'bar',
  },
  spec: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'charts',
  timestamps: true,
});

module.exports = Chart;