export const maxSubjectLength = 72;

export const bodyLineLength = 100;

export const typesOrder = [
  'feat',
  'fix',
  'perf',
  'build',
  'refactor',
  'docs',
  'test',
  'ci',
  'chore',
  'style',
  'revert',
  'initial',
  'dependencies',
  'peerDependencies',
  'devDependencies',
  'metadata',
];

export const types = {
  feat: {
    description: 'A new feature',
    title: 'Features',
    emoji: '✨',
    changelog: true,
    release: 'minor',
    aliases: {
      initial: {
        description: 'Initial commit',
        title: 'Initial',
        emoji: '🎉',
      },
    },
  },
  fix: {
    description: 'A bug fix',
    title: 'Bug Fixes',
    emoji: '🐛',
    changelog: true,
    release: 'patch',
    aliases: {
      dependencies: {
        description: 'Update dependency',
        title: 'Dependencies',
        emoji: '⬆️',
        scope: 'package',
      },
      peerDependencies: {
        description: 'Update peer dependency',
        title: 'Peer dependencies',
        emoji: '⬆️',
        scope: 'package',
      },
      metadata: {
        description: 'Update metadata (package.json)',
        title: 'Metadata',
        emoji: '📦',
        scope: 'package',
      },
    },
  },
  docs: {
    description: 'Documentation only changes',
    title: 'Documentation',
    emoji: '📚',
    changelog: true,
    release: { scope: 'readme', release: 'patch' },
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    title: 'Styles',
    emoji: '💎',
    changelog: true,
    release: false,
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    emoji: '📦',
    changelog: true,
    release: false,
  },
  perf: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    emoji: '🚀',
    changelog: true,
    release: 'patch',
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    emoji: '🚨',
    changelog: true,
    release: false,
  },
  build: {
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    title: 'Builds',
    emoji: '🛠',
    changelog: true,
    release: 'patch',
  },
  ci: {
    description:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    title: 'Continuous Integrations',
    emoji: '⚙️',
    changelog: true,
    release: false,
  },
  chore: {
    description: "Other changes that don't modify src or test files",
    title: 'Chores',
    emoji: '♻️',
    changelog: true,
    release: false,
    aliases: {
      devDependencies: {
        description: 'Update dev dependencies',
        title: 'Dev dependencies',
        emoji: '⬆️',
        scope: 'package',
      },
    },
  },
  revert: {
    description: 'Reverts a previous commit',
    title: 'Reverts',
    emoji: '🗑',
    changelog: true,
    release: false,
  },
};
