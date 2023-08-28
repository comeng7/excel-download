const { resolvePath } = require('./common.js');

const webpackConfigModules = (_, args) => {
  return {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [resolvePath('src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  };
};

module.exports = webpackConfigModules;
