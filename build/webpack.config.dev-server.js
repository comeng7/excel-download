const { joinPath } = require('./common.js');

const webpackConfigDevServer = (_, args) => {
  return {
    static: {
      directory: joinPath('dist'),
    },
    host: 'localhost',
    compress: true,
    https: false,
    port: 3000,
  };
};

module.exports = webpackConfigDevServer;
