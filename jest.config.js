module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|react-native-device-info)/)",
  ],
  setupFiles: ["./jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)"],
};
