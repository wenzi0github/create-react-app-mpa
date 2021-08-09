/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');

// configpath like: src/pages/home/index.json
const getConfigByConfig = (configpath) => {
  const _configPath = path.resolve(__dirname, '..', '..', configpath);
  try {
    const data = fs.readFileSync(_configPath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = getConfigByConfig;
