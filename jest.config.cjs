module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@emotion/react$': require.resolve('@emotion/react'),
    '^@emotion/styled$': require.resolve('@emotion/styled'),
    '^@mui/material$': require.resolve('@mui/material'),
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup/setupTest.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: false,
      },
    ],
  },
};
