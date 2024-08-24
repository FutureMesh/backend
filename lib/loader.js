'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');

const loadDir = async (dir) => {
  const files = await fsp.readdir(dir);
  const container = {};
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(dir, fileName);
    const name = path.basename(fileName, '.js');
    container[name] = require(filePath);
  }
  return container;
};

const loadApplication = async (appPath = process.cwd()) => {
  const apiPath = path.join(appPath, './api');
  const configPath = path.join(appPath, './config');
  const config = await loadDir(configPath);
  const api = await loadDir(apiPath);
  return { api, config };
};

module.exports = loadApplication;
