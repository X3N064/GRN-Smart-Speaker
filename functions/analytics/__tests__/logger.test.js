'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const logger = require('../logger.js');

describe('logger', function () {
  const testMetric = 'testMetric';
  const testTime = 100;
  const testBytes = 1024;
  const testRate = 95;

  beforeEach(function () {
    sinon.stub(logger, 'info');
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('logger instance', function () {
    it('is an object', function () {
      expect(logger).to.be.a('object');
    });

    it('has custom time method', function () {
      expect(logger.time).to.be.a('function');
    });

    it('invokes logger.info through custom time method', function () {
      logger.time(testMetric, testTime);
      expect(logger.info).to.have.been.calledOnce;
    });

    it('has custom bytes method', function () {
      expect(logger.bytes).to.be.a('function');
    });

    it('invokes logger.info through custom bytes method', function () {
      logger.bytes(testMetric, testBytes);
      expect(logger.info).to.have.been.calledOnce;
    });

    it('has custom ratio method', function () {
      expect(logger.ratio).to.be.a('function');
    });

    it('invokes logger.info through custom ratio method', function () {
      logger.ratio(testMetric, testRate);
      expect(logger.info).to.have.been.calledOnce;
    });
  });
});
