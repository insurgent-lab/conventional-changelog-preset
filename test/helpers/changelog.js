import conventionalChangelog from 'conventional-changelog';
import esmock from 'esmock';
import { execa } from 'execa';
import fs from 'fs-extra';
import getStream from 'get-stream';
import { merge } from 'lodash-es';
import pEachSeries from 'p-each-series';
import tempy from 'tempy';

/**
 * Create a temporary git repository with commits.
 *
 * @method changelog
 * @param {Array<string>} messages the commit message (1 commit per message).
 * @param {Array} types the commit types configuration.
 * @param {Array} config additionnal configuration to pass to conventional-changelog.
 * @return {Promise<string>} the changelog.
 */
export default async function changelog(messages, types, config = {}) {
  const dir = tempy.directory();

  process.chdir(dir);
  await fs.mkdir('git-templates');
  await execa('git', ['init', '--template=./git-templates']);

  await pEachSeries(messages, (message) =>
    execa('git', ['commit', '-m', message, '--allow-empty', '--no-gpg-sign'])
  );
  return getStream(
    conventionalChangelog(
      merge(
        {
          config: await esmock('../..', {
            '../../lib/commit-transform': await esmock(
              '../../lib/commit-transform',
              {
                '../../types': { types },
              }
            ),
            '../../lib/commit-groups-compare': await esmock(
              '../../lib/commit-groups-compare',
              { '../../types': { types } }
            ),
          }),
        },
        config
      )
    )
  );
}
