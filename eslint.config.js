import js from '@eslint/js';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import avaPlugin from 'eslint-plugin-ava';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
  },
  {
    // Ignore patterns
    ignores: ['coverage/**'],
  },
  js.configs.recommended,
  prettierConfig,
  {
    // Base settings
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es6,
      },
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  {
    // Ava settings for test files
    files: ['test/**/*.js'],
    plugins: {
      jest: avaPlugin,
    },
  },
];
