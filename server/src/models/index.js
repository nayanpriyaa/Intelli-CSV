const sequelize = require('../config/database');
const User = require('./user');
const Dashboard = require('./dashboard');
const Chart = require('./chart');

// Define associations
User.hasMany(Dashboard, { foreignKey: 'userId', onDelete: 'CASCADE' });
Dashboard.belongsTo(User, { foreignKey: 'userId' });

Dashboard.hasMany(Chart, { foreignKey: 'dashboardId', onDelete: 'CASCADE' });
Chart.belongsTo(Dashboard, { foreignKey: 'dashboardId' });

module.exports = {
  sequelize,
  User,
  Dashboard,
  Chart,
};