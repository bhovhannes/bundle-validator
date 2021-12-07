module.exports = {
  rootDir: '../',
  testTimeout: 10000, // 10 seconds
  clearMocks: true,
  restoreMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  coverageReporters: ['lcovonly', 'html', 'text-summary'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.js']
}
