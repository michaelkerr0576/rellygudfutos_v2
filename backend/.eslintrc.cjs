module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'import',
    'prettier',
    'simple-import-sort',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // Conflict with importing aliases. Typescript and Eslint have errors to handle missing imports
    'node/no-missing-import': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=8.0.0',
        ignores: ['modules'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        project: './backend/tsconfig.json',
      },
    },
  },
};
