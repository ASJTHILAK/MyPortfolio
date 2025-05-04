const webpack = require('webpack');

module.exports = function override(config) {
  // Suppress source map warnings for missing files
  config.ignoreWarnings = [
    (warning) =>
      warning.module &&
      warning.module.resource &&
      warning.module.resource.includes('node_modules/@mediapipe/tasks-vision'),
  ];

  // Configure asset modules
  config.module.rules.push({
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource'
  });

  return config;
};