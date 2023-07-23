# **Insurgent Lab's conventional-changelog preset**

[![npm](https://img.shields.io/npm/v/@insurgentlab/conventional-changelog-preset)](https://www.npmjs.com/package/@insurgentlab/conventional-changelog-preset)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/insurgent-lab/conventional-changelog-preset/release.yml?branch=main)](https://github.com/insurgent-lab/conventional-changelog-preset/actions/workflows/release.yml)
[![Codecov](https://codecov.io/gh/insurgent-lab/conventional-changelog-preset/branch/main/graph/badge.svg)](https://codecov.io/gh/insurgent-lab/conventional-changelog-preset)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/insurgent-lab/conventional-changelog-preset/issues/5)
![Snyk](https://img.shields.io/snyk/vulnerabilities/github/insurgent-lab/conventional-changelog-preset)

[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) preset built from a list of [conventional commit types](src/types.js) (similar to [conventional-commit-types](https://github.com/commitizen/conventional-commit-types)).
Also provides [release rules](https://github.com/semantic-release/commit-analyzer#releaserules) configuration for [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer#releaserules).

Commit types _originally_ from:

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0)
- [commitizen/conventional-commit-types](https://github.com/commitizen/conventional-commit-types)

## Install

```bash
npm install --save-dev @insurgentlab/conventional-changelog-preset
```

## Configuration for [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer)

```bash
npm install --save-dev @semantic-release/commit-analyzer
```

```json
{
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "config": "@insurgentlab/conventional-changelog-preset",
        "releaseRules": "@insurgentlab/conventional-changelog-preset/release-rules"
      }
    ]
  ]
}
```

## Configuration for [@semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator)

```bash
npm install --save-dev @semantic-release/release-notes-generator
```

```json
{
  "plugins": [
    [
      "@semantic-release/release-notes-generator",
      {
        "config": "@insurgentlab/conventional-changelog-preset"
      }
    ]
  ]
}
```

## Use with [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)

```bash
npm install --save-dev conventional-changelog
```

```js
import conventionalChangelog from 'conventional-changelog';

const config = require('@insurgentlab/conventional-changelog-preset');
conventionalChangelog({ config }).pipe(process.stdout);
```

## Commit types

| Commit Type | Title                    | Description                                                                                                 | Emoji | Release                        | Include in changelog |
| :---------: | ------------------------ | ----------------------------------------------------------------------------------------------------------- | :---: | ------------------------------ | :------------------: |
|   `feat`    | Features                 | A new feature                                                                                               |  ✨   | `minor`                        |        `true`        |
|    `fix`    | Bug Fixes                | A bug Fix                                                                                                   |  🐛   | `patch`                        |        `true`        |
|   `docs`    | Documentation            | Documentation only changes                                                                                  |  📚   | `patch` if `scope` is `readme` |        `true`        |
|   `style`   | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |  💎   | -                              |        `true`        |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |  📦   | -                              |        `true`        |
|   `perf`    | Performance Improvements | A code change that improves performance                                                                     |  🚀   | `patch`                        |        `true`        |
|   `test`    | Tests                    | Adding missing tests or correcting existing tests                                                           |  🚨   | -                              |        `true`        |
|   `build`   | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |  🛠   | `patch`                        |        `true`        |
|    `ci`     | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |  ⚙️   | -                              |        `true`        |
|   `chore`   | Chores                   | Other changes that don't modify src or test files                                                           |  ♻️   | -                              |        `true`        |
|  `revert`   | Reverts                  | Reverts a previous commit                                                                                   |  🗑   | -                              |        `true`        |

## Related

- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
