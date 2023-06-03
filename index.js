'use strict';

const _ = require('lodash');
const conventionalChangelogConventionalCommits =
  require('conventional-changelog-conventionalcommits')();
const commitGroupsSort = require('./lib/commit-groups-compare');
const transform = require('./lib/commit-transform');

/**
 * @type {Promise<Object>} preset with `parserOpts` and `writerOpts`.
 */
module.exports = conventionalChangelogConventionalCommits.then((preset) =>
  _.merge(preset, {
    writerOpts: { transform, commitGroupsSort, groupBy: 'groupType' },
  })
);
