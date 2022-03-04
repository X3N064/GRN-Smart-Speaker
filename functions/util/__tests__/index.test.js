'use strict';

const chai = require('chai');
const { expect } = chai;

const util = require('../index.js');

describe('util - index', function () {
  it('contains reference to all utils', function () {
    expect(util.common).to.be.a('object');
    expect(util.array).to.be.a('object');
    expect(util.string).to.be.a('object');
    expect(util.object).to.be.a('object');
    expect(util.datetime).to.be.a('object');
    expect(util.response).to.be.a('object');
    expect(util.ssml).to.be.a('object');
    expect(util.schema).to.be.a('object');
  });
});
