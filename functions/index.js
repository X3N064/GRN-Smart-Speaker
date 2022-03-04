'use strict';

console.time('cold-start');

const functions = require('firebase-functions');

const app = require('./app.js');
const {
  FUNCTION_NAME,
  FUNCTION_VERSION,
  FUNCTION_MEMORY,
  FUNCTION_REGION,
  FUNCTION_TIMEOUT,
} = require('./config.js');

exports[`${FUNCTION_NAME}_${FUNCTION_VERSION}`] = functions
  .region(FUNCTION_REGION)
  .runWith({ timeoutSeconds: FUNCTION_TIMEOUT, memory: FUNCTION_MEMORY })
  .https.onRequest(app);

console.timeEnd('cold-start');
