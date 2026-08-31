import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

const sharedRules = {
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-jsdoc': 'off',
  'strict': ['error', 'safe'],
  '@stylistic/linebreak-style': 'off',
  'no-restricted-syntax': 'off',
  'no-await-in-loop': 'off',
  'import-x/no-unresolved': 'off',
  'import-x/no-extraneous-dependencies': ['error', {
    devDependencies: true,
  }],
};

export default [
  {
    ignores: ['out/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', '.config/eslint.config.mjs'],
  },
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
    files: ['src/**/*.js', '.config/**/*.js', 'test/**/*.js'],
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
    rules: sharedRules,
  },
  {
    files: ['.config/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: sharedRules,
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
    rules: sharedRules,
  },
];
