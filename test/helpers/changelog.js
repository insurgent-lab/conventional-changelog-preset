const conventionalChangelog = require('conventional-changelog');
const execa = require('execa');
const getStream = require('get-stream');
const { merge } = require('lodash');
const pEachSeries = require('p-each-series');
const proxyquire = require('proxyquire');
const tempy = require('tempy');
const fs = require('fs-extra');

/**
 * Create a temporary git repository with commits.
 *
 * @method changelog
 * @param {Array<string>} messages the commit message (1 commit per message).
 * @param {Array} types the commit types configuration.
 * @param {Array} config additionnal configuration to pass to conventional-changelog.
 * @return {string} the changelog.
 */
module.exports = async function changelog(messages, types, config = {}) {
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
          config: proxyquire('../..', {
            './lib/commit-transform': proxyquire('../../lib/commit-transform', {
              '../types': types,
            }),
            './lib/commit-groups-compare': proxyquire(
              '../../lib/commit-groups-compare',
              { '../types': types }
            ),
          }),
        },
        config
      )
    )
  );
};
