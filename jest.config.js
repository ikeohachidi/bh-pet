module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/src/**/*.spec.ts'],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts"
  ]
}
