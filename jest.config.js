const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const transform = {
  '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
};

const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};

const config = {
  moduleNameMapper,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    '<rootDir>/src/app/api/**/*.{ts,tsx}',
    '<rootDir>/src/lib/**/*.{ts,tsx}',
    '<rootDir>/src/components/WaitlistForm.tsx',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      testMatch: ['<rootDir>/src/**/*.test.tsx'],
      moduleNameMapper,
      transform,
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      moduleNameMapper,
      transform,
    },
  ],
};

module.exports = createJestConfig(config);

