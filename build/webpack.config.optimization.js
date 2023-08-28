const { isDevMode } = require('./common.js');

const webpackConfigOptimization = (_, args) => {
  const IS_DEV_MODE = isDevMode(args);

  return {
    minimize: !IS_DEV_MODE,
    concatenateModules: true,
  };
};

module.exports = webpackConfigOptimization;
