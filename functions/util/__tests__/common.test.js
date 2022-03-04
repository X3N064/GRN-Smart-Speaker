'use strict';

const chai = require('chai');
const { expect } = chai;

const common = require('../common.js');

describe('util - common', function () {
  describe('identity', function () {
    it('returns the same data type of input', function () {
      const inputStr = 'abc';
      const outputStr = common.identity(inputStr);
      expect(outputStr).to.equal(inputStr);
      const inputNum = 123;
      const outputNum = common.identity(inputNum);
      expect(outputNum).to.equal(inputNum);
      const inputObj = { a: 1, b: 2 };
      const outputObj = common.identity(inputObj);
      expect(outputObj).to.equal(inputObj);
    });
  });

  describe('randomInteger', function () {
    it('returns a number', function () {
      const output = common.randomInteger(5);
      expect(output).to.be.a('number');
    });

    it('returns an int between 0(inclusive) and input(exclusive)', function () {
      for (let i = 0; i < 20; i++) {
        const output = common.randomInteger(5);
        expect(output).to.be.within(0, 5);
      }
    });
  });
});
