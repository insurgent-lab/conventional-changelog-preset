import _ from 'lodash-es';

import conventionalChangelogConventionalCommits from 'conventional-changelog-conventionalcommits';

import commitGroupsSort from './lib/commit-groups-compare.js';
import transform from './lib/commit-transform.js';

async function createPreset() {
  return conventionalChangelogConventionalCommits().then((preset) =>
    _.merge(preset, {
      writerOpts: { transform, commitGroupsSort, groupBy: 'groupType' },
    })
  );
}

export default createPreset;
