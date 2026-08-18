// @ts-check
const { defineConfig, globalIgnores } = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jsdoc = require('eslint-plugin-jsdoc');
const unicorn = require('eslint-plugin-unicorn').default;
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**', 'poll-app/.angular/**']),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      angular.configs.tsRecommended,
      prettierConfig,
    ],
    plugins: {
      jsdoc,
      unicorn,
    },
    processor: angular.processInlineTemplates,
    rules: {
      // 1. TypeScript/Code-Qualitaet

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
      ],

      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            // ClassDeclaration: true,
          },
        },
      ],

      'max-lines-per-function': [
        'error',
        {
          max: 16,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // 2. Formatierung (Prettier uebernimmt den Rest, siehe eslint-config-prettier oben)

      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: 'function',
          next: 'function',
        },
      ],

      // 3. Dateistruktur

      'max-lines': [
        'error',
        {
          max: 400,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
