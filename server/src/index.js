const app = require('./app');
const sequelize = require('./config/database');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;

// Ensure required directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Start server ONLY after DB is ready
sequelize
  .authenticate()
  .then(() => {
    console.log('✓ Database connection established successfully');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('✓ Database models synchronized');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error('✗ Unable to start server');
    console.error(err);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  sequelize.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  sequelize.close();
  process.exit(0);
});
