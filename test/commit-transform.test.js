import test from 'ava';
import transform from './helpers/commit-transform.js';

const COMMIT_HASH_LENGTH = 7;

test('Return transformed commit if type has "changelog" "true"', async (t) => {
  const commit = await transform(
    { type: 'feat', hash: '1234567890', notes: [] },
    { feat: { title: 'Feature title', changelog: true } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
});

test('Return transformed commit and truncate hash', async (t) => {
  const commit = await transform(
    { type: 'feat', hash: '1234567890', notes: [] },
    { feat: { title: 'Feature title', changelog: true } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.shortHash.length, COMMIT_HASH_LENGTH);
  t.true('1234567890'.startsWith(commit.shortHash));
});

test('Return "null" if type has "changelog" "false"', async (t) => {
  const commit = await transform(
    { type: 'feat', notes: [] },
    { feat: { title: 'Feature title', changelog: false } }
  );

  t.is(commit, null);
});

test('Return "null" if type has no "changelog" set', async (t) => {
  const commit = await transform(
    { type: 'feat', notes: [] },
    { feat: { title: 'Feature title' } }
  );

  t.is(commit, null);
});

test('Return transformed commit if it has a breaking change', async (t) => {
  const commit = await transform(
    {
      type: 'feat',
      notes: [{ title: 'BREAKING CHANGE', text: 'some breaking change' }],
    },
    { feat: { title: 'Feature title', changelog: false } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
});

test('Set notes title to "Breaking changes" if commit has a breaking change', async (t) => {
  const commit = await transform(
    {
      type: 'feat',
      notes: [{ title: 'BREAKING CHANGE', text: 'some breaking change' }],
    },
    { feat: { title: 'Feature title', changelog: false } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.notes[0].title, 'Breaking changes');
});

test('Return transformed commit and preserve "scope"', async (t) => {
  const commit = await transform(
    { type: 'feat', scope: 'scope1', notes: [] },
    { feat: { title: 'Feature title', changelog: true } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.scope, 'scope1');
});

test('Return transformed commit and remove "scope" if "*"', async (t) => {
  const commit = await transform(
    { type: 'feat', scope: '*', notes: [] },
    { feat: { title: 'Feature title', changelog: true } }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.falsy(commit.scope);
});

test('Transform reference links in subject', async (t) => {
  const commit = await transform(
    { type: 'feat', subject: 'Subject, closes #123, fix #456', notes: [] },
    { feat: { title: 'Feature title', changelog: true } },
    {
      host: 'https://github.com',
      owner: 'github_user',
      repository: 'repo_name',
    }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(
    commit.subject,
    'Subject, closes [#123](https://github.com/github_user/repo_name/issues/123), fix [#456](https://github.com/github_user/repo_name/issues/456)'
  );
});

test('Transform reference link in subject (with repoUrl)', async (t) => {
  const commit = await transform(
    { type: 'feat', subject: 'Subject, closes #123, fix #456', notes: [] },
    { feat: { title: 'Feature title', changelog: true } },
    { repoUrl: 'https://github.com/github_user/repo_name' }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(
    commit.subject,
    'Subject, closes [#123](https://github.com/github_user/repo_name/issues/123), fix [#456](https://github.com/github_user/repo_name/issues/456)'
  );
});

test('Remove reference if already present in subject', async (t) => {
  const commit = await transform(
    {
      type: 'feat',
      subject: 'Subject, closes #123',
      references: [{ issue: '123' }, { issue: '456' }],
      notes: [],
    },
    { feat: { title: 'Feature title', changelog: true } },
    { repoUrl: 'https://github.com/github_user/repo_name' }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.references.length, 1);
  t.deepEqual(commit.references[0], { issue: '456' });
});

test('Transform mention link in subject', async (t) => {
  const commit = await transform(
    { type: 'feat', subject: 'Subject, @username @username2', notes: [] },
    { feat: { title: 'Feature title', changelog: true } },
    { host: 'https://github.com' }
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(
    commit.subject,
    'Subject, [@username](https://github.com/username) [@username2](https://github.com/username2)'
  );
});
