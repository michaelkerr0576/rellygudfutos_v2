/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// eslint-disable-next-line
const { pathsToModuleNameMapper } = require('ts-jest');
// eslint-disable-next-line
const { compilerOptions } = require('./tsconfig.paths');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.d.ts', '.js'],
};
