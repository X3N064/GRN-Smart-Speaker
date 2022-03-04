/**
 * @fileoverview Common utility functions.
 */

const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const yaml = require('js-yaml');

const console = require('./console.js');

/**
 * Read json file into memory.
 * @param {string} filePath - File path.
 * @return {Object} - Parsed data.
 */
const readJsonFile = (filePath) => {
  return jsonfile.readFileSync(filePath);
};

/**
 * Write data to local file in json format.
 * @param {string} filePath - File path.
 * @param {Object} data - Data to write.
 */
const writeJsonFile = (filePath, data) => {
  ensureDirectoryExist(filePath);
  jsonfile.writeFileSync(filePath, data, {
    flag: 'w',
    spaces: 2,
  });
  console.log(`Successfully wrote ${filePath}.`.green);
};

/**
 * Read yaml file into memory.
 * @param {string} filePath - File path.
 * @return {Object} - Parsed data.
 */
const readYamlFile = (filePath) => {
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};

/**
 * Writes data to local file in yaml format.
 * @param {string} filePath - File path.
 * @param {Object} data - Data to write.
 */
const writeYamlFile = (filePath, data) => {
  ensureDirectoryExist(filePath);
  fs.writeFileSync(filePath, yaml.safeDump(data));
  console.log(`Successfully wrote ${filePath}.`.green);
};

/**
 * Recursively creates a directory if the file's directory is missing.
 * @param {string} filePath - File path.
 */
const ensureDirectoryExist = (filePath) => {
  const dirPath = path.dirname(filePath);
  if (fs.existsSync(dirPath)) return;
  ensureDirectoryExist(dirPath);
  fs.mkdirSync(dirPath);
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  readYamlFile,
  writeYamlFile,
  ensureDirectoryExist,
};
