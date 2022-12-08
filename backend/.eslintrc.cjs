module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  overrides: [
    {
      files: ['*test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'import', 'prettier', 'simple-import-sort', 'jest'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'import/prefer-default-export': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unused-vars': 'off',
    // * Conflict with importing aliases. Typescript and Eslint have errors to handle missing imports
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': [
      'error',
      {
        // * Allow some devDependencies that are only used in tests or builds
        allowModules: ['jest-when', 'timekeeper'],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
        version: '>=10.6.0',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        formatOnSave: true,
        printWidth: 110,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // * Side effect imports.
          ['^\\u0000'],
          // * Packages.
          ['^express', '^\\w'],
          // * Internal packages.
          ['^(@|components)(/.*|$)'],
          // * Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // * Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'sort-keys': ['error', 'asc', { caseSensitive: false, minKeys: 2, natural: true }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
