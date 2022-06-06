module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:node/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'import',
    'jsx-a11y',
    'prettier',
    'react-hooks',
    'react',
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
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          ['^react', '^\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
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
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: false,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './frontend/tsconfig.json',
      },
    },
  },
};
