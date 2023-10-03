import _ from 'lodash-es';
import { types } from './types.js';

/**
 * @type {Array} `releaseRules` configuration for `sr-commit-analyzer`.
 */
export default [{ breaking: true, release: 'major' }].concat(
  _.transform(
    types,
    (releaseRules, value, type) => {
      if (value.release) {
        if (typeof value.release === 'string') {
          releaseRules.push({ type, release: value.release });
        }

        if (value.release.release) {
          releaseRules.push({ type, ...value.release });
        }
      }
    },
    []
  )
);
