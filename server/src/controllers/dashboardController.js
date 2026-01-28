const { Dashboard, Chart } = require('../models');
const { validateChartSpec } = require('../utils/validators');

/**
 * Get all dashboards for the current user
 */
exports.getDashboards = async (req, res, next) => {
  try {
    const dashboards = await Dashboard.findAll({
      where: { userId: req.userId },
      include: [{ model: Chart, attributes: ['id', 'type', 'order'] }],
      order: [['updatedAt', 'DESC']],
    });

    res.json({ dashboards });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single dashboard by ID
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
      include: [{ model: Chart, order: [['order', 'ASC']] }],
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    res.json({ dashboard });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new dashboard
 */
exports.createDashboard = async (req, res, next) => {
  try {
    const { name, metadata } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Dashboard name is required' });
    }

    const dashboard = await Dashboard.create({
      userId: req.userId,
      name: name.trim(),
      metadata: metadata || {},
    });

    res.status(201).json({ dashboard });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a dashboard
 */
exports.updateDashboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, metadata } = req.body;

    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    if (name !== undefined) {
      if (name.trim() === '') {
        return res.status(400).json({ message: 'Dashboard name cannot be empty' });
      }
      dashboard.name = name.trim();
    }

    if (metadata !== undefined) {
      dashboard.metadata = metadata;
    }

    await dashboard.save();

    res.json({ dashboard });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a dashboard
 */
exports.deleteDashboard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    await dashboard.destroy();

    res.json({ message: 'Dashboard deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a chart to a dashboard
 */
exports.addChart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { spec } = req.body;

    // Verify dashboard ownership
    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    // Validate chart spec
    if (!spec || typeof spec !== 'object') {
      return res.status(400).json({ message: 'Invalid chart specification' });
    }

    const validationError = validateChartSpec(spec);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Get next order number
    const maxOrder = await Chart.max('order', {
      where: { dashboardId: id },
    });
    const order = (maxOrder || 0) + 1;

    const chart = await Chart.create({
      dashboardId: id,
      type: spec.type,
      spec,
      order,
    });

    res.status(201).json({ chart });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a chart
 */
exports.updateChart = async (req, res, next) => {
  try {
    const { id, chartId } = req.params;
    const { spec } = req.body;

    // Verify dashboard ownership
    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    const chart = await Chart.findOne({
      where: { id: chartId, dashboardId: id },
    });

    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }

    // Validate chart spec
    if (!spec || typeof spec !== 'object') {
      return res.status(400).json({ message: 'Invalid chart specification' });
    }

    const validationError = validateChartSpec(spec);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    chart.type = spec.type;
    chart.spec = spec;
    await chart.save();

    res.json({ chart });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a chart
 */
exports.deleteChart = async (req, res, next) => {
  try {
    const { id, chartId } = req.params;

    // Verify dashboard ownership
    const dashboard = await Dashboard.findOne({
      where: { id, userId: req.userId },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    const chart = await Chart.findOne({
      where: { id: chartId, dashboardId: id },
    });

    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }

    await chart.destroy();

    res.json({ message: 'Chart deleted successfully' });
  } catch (error) {
    next(error);
  }
};