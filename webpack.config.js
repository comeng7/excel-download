const path = require('path');
const { webpackConfigModules, webpackConfigDevServer, webpackConfigOptimization } = require('./build/index.js');

const config = (_, args) => {
  const { mode } = args || 'development';
  const IS_DEV_MODE = mode === 'development';

  return {
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    mode,
    entry: {
      excelDownload: './src/ExcelDownloader.ts',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: IS_DEV_MODE ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
      pathinfo: false,
      path: path.resolve(__dirname, 'lib'),
      clean: true,
      library: 'excel-download',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: webpackConfigModules(_, args),
    devServer: webpackConfigDevServer(_, args),
    optimization: webpackConfigOptimization(_, args),
  };
};

module.exports = config;
