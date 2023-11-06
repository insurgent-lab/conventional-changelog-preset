import esmock from 'esmock';

/**
 * Return the `commit-groups-compare` function, replacing `types` with parameter.
 *
 * @method commitGroupsCompare
 * @param {Object} types commit types to test with.
 * @return {Promise<Object>} the commit groups compare function.
 */
export default function commitGroupsCompare(types) {
  return esmock('../../lib/commit-groups-compare', { '../../types': types });
}
