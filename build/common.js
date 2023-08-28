const path = require('path');

const isDevMode = (args) => args.mode === 'development';
const PROJECT_PATH = path.dirname('../');
const resolvePath = (relPath) => path.resolve(PROJECT_PATH, relPath);
const joinPath = (relPath) => path.join(PROJECT_PATH, relPath);

module.exports = {
  isDevMode,
  PROJECT_PATH,
  resolvePath,
  joinPath,
};
