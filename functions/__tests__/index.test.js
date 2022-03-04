'use strict';

const chai = require('chai');
const { expect } = chai;

const functionHandler = require('../index.js');
const { FUNCTION_NAME, FUNCTION_VERSION } = require('../config.js');

describe('index', function () {
  it('exports function name with current version from config', function () {
    expect(functionHandler).to.have.ownProperty(`${FUNCTION_NAME}_${FUNCTION_VERSION}`);
  });
});
