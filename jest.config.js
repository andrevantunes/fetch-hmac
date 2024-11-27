module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: { NODE_ENV: 'test' },
  modulePathIgnorePatterns: ['__tests__/__support__'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}
