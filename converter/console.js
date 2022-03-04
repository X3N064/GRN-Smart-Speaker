/**
 * @fileoverview Wrapper class for console logging functions that appends colored prefixes.
 */

// eslint-disable-next-line no-unused-vars
const colors = require('colors');

class ConsoleHelper {
  constructor() {
    this._verbosity = 0;
  }

  /**
   * Sets the system verbosity level.
   * @param {number} verbosity - New verbosity level.
   */
  setVerbosity(verbosity) {
    this._verbosity = verbosity;
  }

  /**
   * Outputs a message to console, prefixed with "ERROR:" in red.
   * @param {string} str - Message to output.
   */
  error(str) {
    console.error('ERROR: '.red + str);
  }

  /**
   * Outputs a message to console, prefixed with "WARN:" in yellow.
   * @param {string} str - Message to output.
   */
  warn(str) {
    console.warn('WARN: '.yellow + str);
  }

  /**
   * If the system verbosity is >= verbosity, outputs a message to console,
   * prefixed with "INFO:" in gray.
   * @param {string} str - Message to output.
   * @param {number} [verbosity] - Message will be displayed only if this value <= system verbosity.
   */
  info(str, verbosity = 0) {
    if (this._verbosity >= verbosity) {
      console.info('INFO: '.gray + str);
    }
  }

  /**
   * Logs a message with no prefix.
   * @param {string} str - Message to output.
   */
  log(str) {
    console.log(str);
  }
}

module.exports = new ConsoleHelper();
