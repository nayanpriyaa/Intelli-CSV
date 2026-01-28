const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// All dashboard routes require authentication
router.use(authMiddleware);

// Dashboard CRUD
router.get('/', dashboardController.getDashboards);
router.post('/', dashboardController.createDashboard);
router.get('/:id', dashboardController.getDashboard);
router.put('/:id', dashboardController.updateDashboard);
router.delete('/:id', dashboardController.deleteDashboard);

// Chart operations
router.post('/:id/charts', dashboardController.addChart);
router.put('/:id/charts/:chartId', dashboardController.updateChart);
router.delete('/:id/charts/:chartId', dashboardController.deleteChart);

module.exports = router;