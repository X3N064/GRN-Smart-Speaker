'use strict';

const config = require('../config.js');

/**
 * @module debug
 * @desc Utility functions for debug logging.
 */

/**
 * HTTP response status codes.
 */
const STATUS_CODE = {
  OK: 200,
  ERROR: 500,
};

/**
 * Default response info for various states.
 */
const states = {
  success: {
    status: STATUS_CODE.OK,
    label: 'Webhook Fulfillment Successfully Executed',
  },
  failure: {
    status: STATUS_CODE.ERROR,
    label: 'Webhook Execution Error',
  },
};

/**
 * Sets debug info on conv.session.params.
 * @param {ConversationV3} conv
 * @param {Error} [error] - Captured error.
 * @static
 */
const setDebugInfo = (conv, error) => {
  if (config.ENABLE_DEBUG) {
    const debugInfo = Object.assign({}, states[error ? 'failure' : 'success'], {
      version: config.FUNCTION_VERSION,
      executionId: conv.headers['function-execution-id'],
    });
    if (error) {
      debugInfo.message = error.message;
      debugInfo.stack = error.stack;
    }
    conv.session.params[config.DEBUG_KEY] = debugInfo;
  }
};

module.exports = {
  states,
  setDebugInfo,
};
