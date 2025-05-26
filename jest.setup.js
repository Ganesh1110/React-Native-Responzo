jest.mock("react-native-device-info", () => ({
  isTablet: jest.fn(() => false),
  hasNotch: jest.fn(() => false),
  getStatusBarHeight: jest.fn(() => 20),
}));
