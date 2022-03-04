'use strict';

const chai = require('chai');
const { expect } = chai;

const { states, setDebugInfo } = require('../debug.js');
const config = require('../../config.js');

describe('debug', function () {
  describe('setDebugInfo', function () {
    const testExecutionId = 'xyz123';
    let testConv;

    beforeEach(function () {
      testConv = {
        session: {
          params: {
            data: {},
          },
        },
        headers: { ['function-execution-id']: testExecutionId },
      };
      config.ENABLE_DEBUG = true;
    });

    it('adds DEBUG_KEY from config', function () {
      setDebugInfo(testConv);
      expect(testConv.session.params[config.DEBUG_KEY]).to.be.a('object');
    });

    it('not add DEBUG_KEY from config if ENABLE_DEBUG if false', function () {
      config.ENABLE_DEBUG = false;
      setDebugInfo(testConv);
      expect(testConv.session.params[config.DEBUG_KEY]).to.be.undefined;
    });

    it('sets correct conversation debug info for success', function () {
      setDebugInfo(testConv);
      const debugInfo = testConv.session.params[config.DEBUG_KEY];
      expect(debugInfo.status).to.equal(states.success.status);
      expect(debugInfo.label).to.equal(states.success.label);
      expect(debugInfo.version).to.equal(config.FUNCTION_VERSION);
      expect(debugInfo.executionId).to.equal(testExecutionId);
    });

    it('sets correct conversation debug info for failure', function () {
      const testError = new Error('failed');
      setDebugInfo(testConv, testError);
      const debugInfo = testConv.session.params[config.DEBUG_KEY];
      expect(debugInfo.status).to.equal(states.failure.status);
      expect(debugInfo.label).to.equal(states.failure.label);
      expect(debugInfo.version).to.equal(config.FUNCTION_VERSION);
      expect(debugInfo.executionId).to.equal(testExecutionId);
      expect(debugInfo.message).to.equal(testError.message);
      expect(debugInfo.stack).to.equal(testError.stack);
    });
  });
});
