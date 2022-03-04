'use strict';

/**
 * @module util/common
 * @desc Utility functions for common helpers.
 */

/**
 * Returns whatever value is passed as the argument.
 * @template T
 * @param {T} val - Input value.
 * @return {T} - Identical to input value.
 * @static
 */
const identity = (val) => val;

/**
 * Returns a random integer between 0 and upper limit (exclusive).
 * @param {number} upperLimit - Upper limit for integer choices.
 * @return {number} - Random integer.
 * @static
 */
const randomInteger = (upperLimit) => Math.floor(Math.random() * upperLimit);

module.exports = {
  identity,
  randomInteger,
};
