import { types } from '../types.js';

const COMMIT_HASH_LENGTH = 7;

/**
 * Transform a parsed commit to render the changelog.
 *
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} context `conventional-changelog` context.
 * @return {Object} the transformed commit.
 */
export default (commit, context) => {
  const entry = types[commit.type];

  const notes = commit.notes.map((note) => {
    return {
      ...note,
      title: 'Breaking changes',
    };
  });

  if (!entry || (!entry.changelog && notes.length == 0)) return null;

  const groupType = `${entry.emoji ? `${entry.emoji} ` : ''}${entry.title}`;

  const scope = commit.scope === '*' ? '' : commit.scope;

  const shortHash =
    typeof commit.hash === 'string'
      ? commit.hash.substring(0, COMMIT_HASH_LENGTH)
      : commit.shortHash;

  let subject = commit.subject;
  const subjectReferences = [];

  if (typeof commit.subject === 'string') {
    let url = context.repository
      ? `${context.host}/${context.owner}/${context.repository}`
      : context.repoUrl;

    if (url) {
      url += '/issues/';
      // Issue URLs.
      subject = subject.replace(/#(\d+)/g, (_, issue) => {
        subjectReferences.push(issue);
        return `[#${issue}](${url}${issue})`;
      });
    }

    if (context.host) {
      // User URLs.
      subject = subject.replace(
        /\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g,
        `[@$1](${context.host}/$1)`
      );
    }
  }

  let references;
  if (commit.references) {
    // Remove references that already appear in the subject
    references = commit.references.filter(
      (reference) => !subjectReferences.includes(reference.issue)
    );
  }

  return {
    notes,
    groupType,
    type: commit.type,
    scope,
    shortHash,
    subject,
    references,
  };
};
