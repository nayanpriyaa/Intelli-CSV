/**
 * Validate email format
 */
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
exports.validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate chart specification
 */
exports.validateChartSpec = (spec) => {
  const validChartTypes = ['bar', 'line', 'area', 'pie', 'scatter', 'histogram', 'treemap'];

  if (!spec.type) {
    return 'Chart type is required';
  }

  if (!validChartTypes.includes(spec.type)) {
    return `Invalid chart type. Must be one of: ${validChartTypes.join(', ')}`;
  }

  if (!spec.xColumn) {
    return 'X column is required';
  }

  if (spec.type !== 'pie' && !spec.yColumn) {
    return 'Y column is required for this chart type';
  }

  return null; // No errors
};