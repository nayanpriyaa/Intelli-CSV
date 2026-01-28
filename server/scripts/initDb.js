const { sequelize, User, Dashboard, Chart } = require('../src/models');

async function initDatabase() {
  try {
    console.log('Initializing database...');

    // Sync all models (create tables)
    await sequelize.sync({ force: true }); // force: true will drop existing tables
    console.log('✓ Database tables created');

    // Create demo user
    const demoUser = await User.create({
      email: 'demo@example.com',
      password: 'Demo123!', // Will be hashed by model hook
    });
    console.log('✓ Demo user created (demo@example.com / Demo123!)');

    // Create sample dashboard
    const dashboard = await Dashboard.create({
      userId: demoUser.id,
      name: 'Sample Sales Dashboard',
      metadata: {
        description: 'Example dashboard with sample charts',
      },
    });
    console.log('✓ Sample dashboard created');

    // Create sample charts
    const chart1 = await Chart.create({
      dashboardId: dashboard.id,
      type: 'bar',
      spec: {
        type: 'bar',
        title: 'Sales by Region',
        xColumn: 'Region',
        yColumn: 'Sales',
      },
      order: 1,
    });

    const chart2 = await Chart.create({
      dashboardId: dashboard.id,
      type: 'line',
      spec: {
        type: 'line',
        title: 'Monthly Revenue Trend',
        xColumn: 'Month',
        yColumn: 'Revenue',
      },
      order: 2,
    });

    console.log('✓ Sample charts created');

    console.log('\n✅ Database initialization complete!');
    console.log('\nYou can now login with:');
    console.log('Email: demo@example.com');
    console.log('Password: Demo123!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();