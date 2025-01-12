module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', 'public/js'], // Include public/js for resolving modules
    testEnvironment: 'jsdom', // Ensure tests run in a browser-like environment
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JS and JSX files
      }
  };
  