import test from 'ava';
import { find } from 'lodash-es';
import releaseRules from './helpers/release-rules.js';

test('Always set breking changes as "major" release', async (t) => {
  t.deepEqual(find(await releaseRules(), { breaking: true }), {
    breaking: true,
    release: 'major',
  });
});

test('Include a type in release-rules if it has "release" set to "true"', async (t) => {
  t.deepEqual(
    find(await releaseRules({ feat: { release: 'minor' } }), { type: 'feat' }),
    { type: 'feat', release: 'minor' }
  );
});

test('Do not Include a type in release-rules if it has "release" set to "false"', async (t) => {
  t.falsy(
    find(await releaseRules({ feat: { release: false } }), { type: 'feat' })
  );
});

test('Do not Include a type in release-rules if it has no "release"', async (t) => {
  t.falsy(find(await releaseRules({ feat: {} }), { type: 'feat' }));
});

test('Include a type in release-rules if it has "release" set to a rule', async (t) => {
  t.deepEqual(
    find(
      await releaseRules({
        feat: { release: { criteria: 'value', release: 'minor' } },
      }),
      { type: 'feat' }
    ),
    {
      type: 'feat',
      criteria: 'value',
      release: 'minor',
    }
  );
});
