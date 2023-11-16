module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['coverage', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['test/**/*.js'],
      plugins: ['ava'],
    },
  ],
};
