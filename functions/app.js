'use strict';

const { conversation, Simple } = require('@assistant/conversation');

const { Action, Scene, Prompt } = require('./constant.js');
const util = require('./util');
const debug = require('./analytics/debug.js');
const logger = require('./analytics/logger.js');
const ConvHelper = require('./conv-helper.js');
const Fulfillment = require('./fulfillment.js');

/**
 * @module app
 * @desc ConversationV3 App Setup and Routing
 */

// Instantiates the ConversationV3 app.
const app = conversation({ debug: false });

// Map fulfillment handlers with actions
const fulfillment = Fulfillment.create();
for (const action of Object.values(Action)) {
  if (typeof fulfillment[action] !== 'function') continue;
  app.handle(action, (conv, ...args) => {
    conv.$helper = ConvHelper.create(conv);
    fulfillment[action](conv, ...args);
    debug.setDebugInfo(conv);
  });
}

// Handles uncaught errors.
app.catch((conv, error) => {
  debug.setDebugInfo(conv, error);
  logger.error(`An error has occurred handling [${conv.handler.name}]: `, {
    labels: { execution_id: conv.headers['function-execution-id'] },
    stack: error.stack,
    conv: util.object.stringify(conv),
  });
  conv.scene.next = { name: Scene.END_CONVERSATION };
  conv.add(new Simple(Prompt.NO_MATCH_3));
});

module.exports = app;
