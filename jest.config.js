module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: ['node_modules'],
  modulePaths: ['src', 'test'],
  moduleFileExtensions: ['js', 'tsx'],
  moduleNameMapper: {
    'components(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
