import esmock from 'esmock';

/**
 * Call the `commit-transform` function, replacing `types` with parameter.
 *
 * @method commitTransform
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} types commit types to test with.
 * @param {Object} [context={}] context parameter to pass to `commit-transform`.
 * @return {Promise<Object>} the commit transformed with the `types` in parameter.
 */
export default async function commitTransform(commit, types, context = {}) {
  return (
    await esmock('../../lib/commit-transform', { '../../types': { types } })
  )(commit, context);
}
