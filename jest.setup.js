jest.mock("react-native-device-info", () => ({
  isTablet: () => false,
  hasNotch: () => false,
  hasDynamicIsland: () => false,
}));
