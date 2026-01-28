const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Parse DATABASE_URL or use default SQLite path
const databaseUrl = process.env.DATABASE_URL || 'sqlite:./data/database.sqlite';

let sequelize;

if (databaseUrl.startsWith('sqlite:')) {
  // SQLite configuration
  const dbPath = databaseUrl.replace('sqlite:', '');
  const absolutePath = path.isAbsolute(dbPath) 
    ? dbPath 
    : path.join(__dirname, '..', '..', dbPath);

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: absolutePath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    },
  });
} else {
  // PostgreSQL or MySQL configuration (for future use)
  sequelize = new Sequelize(databaseUrl, {
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    },
  });
}

module.exports = sequelize;