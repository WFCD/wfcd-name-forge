import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  js.configs.recommended,
  importX.flatConfigs.recommended,
  jsdoc.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      jsdoc: {
        preferredTypes: {
          String: 'string',
          Number: 'number',
          Boolean: 'boolean',
          Function: 'function',
          object: 'Object',
          date: 'Date',
          error: 'Error',
        },
      },
    },
    rules: {
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-jsdoc': 'off',
      strict: ['error', 'safe'],
      '@stylistic/linebreak-style': 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
  {
    files: ['src/**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-jsdoc': 'off',
      strict: ['error', 'safe'],
      '@stylistic/linebreak-style': 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
];
