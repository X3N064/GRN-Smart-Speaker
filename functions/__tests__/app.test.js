'use strict';

const rewire = require('rewire');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const app = rewire('../app.js');
const logger = require('../analytics/logger.js');

describe('app', function () {
  before(function () {
    logger.transports.forEach((t) => (t.silent = true));
  });

  beforeEach(function () {
    sinon.stub(console, 'log');
    sinon.stub(console, 'error');
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('exports', function () {
    it('exports a ConversationV3 app', function () {
      expect(app).to.be.a('function');
      expect(app.middleware).to.be.a('function');
      expect(app.catch).to.be.a('function');
    });
  });
});
