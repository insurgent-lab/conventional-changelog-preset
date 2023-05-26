const proxyquire = require('proxyquire');

/**
 * Return the `commit-groups-compare` function, replacing `types` with parameter.
 *
 * @method commitGroupsCompare
 * @param {Object} types commit types to test with.
 * @return {Object} the commit groups compare function.
 */
module.exports = function commitGroupsCompare(types) {
  return proxyquire('../../lib/commit-groups-compare', { '../types': types });
};
