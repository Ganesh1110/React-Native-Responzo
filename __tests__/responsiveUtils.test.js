import Responsive from "../src/index";

jest.mock("react-native", () => ({
  Platform: { OS: "ios" },
  Dimensions: {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  },
  PixelRatio: {
    get: jest.fn(() => 3),
  },
  StatusBar: {
    currentHeight: 24,
  },
}));

jest.mock("react-native-device-info", () => ({
  isTablet: jest.fn(() => false),
  hasNotch: jest.fn(() => true),
  hasDynamicIsland: jest.fn(() => false),
}));

describe("Responsive Utility Module", () => {
  it("should return correct device width and height", () => {
    expect(Responsive.deviceWidth).toBe(375);
    expect(Responsive.deviceHeight).toBe(812);
  });

  it("should calculate status bar height correctly for iOS with notch", () => {
    expect(Responsive.statusBarHeight).toBe(44);
  });

  it("should calculate available height correctly (excluding status bar)", () => {
    expect(Responsive.availableHeight).toBe(768); // 812 - 44
  });

  it("should return correct width percent value", () => {
    expect(Responsive.widthPercent(50)).toBe(187.5); // 50% of 375
  });

  it("should return correct height percent value", () => {
    expect(Responsive.heightPercent(50)).toBe(384); // 50% of 768
  });

  it("should scale size moderately based on width", () => {
    const size = 20;
    const expected = 20; // no scaling (375/375)
    expect(Responsive.moderateWidth(size)).toBe(expected);
  });

  it("should scale font size for phone devices", () => {
    const fontSize = 16;
    const result = Responsive.scaledFontSize(fontSize);
    expect(result).toBeCloseTo((375 / 375) * 16); // ≈16
  });

  it("should expose tablet and notch flags correctly", () => {
    expect(Responsive.isTablet).toBe(false);
    expect(Responsive.hasNotch).toBe(true);
  });

  it("should detect iPad as tablet", () => {
    jest.resetModules();
    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => true),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));
    const Responsive = require("../src/index").default;
    expect(Responsive.isTablet).toBe(true);
  });

  it("should handle zero width/height", () => {
    jest.resetModules(); // clear cached modules

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({
          width: 0,
          height: 0,
        })),
      },
      PixelRatio: {
        get: jest.fn(() => 1),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    // re-mock device-info again if needed
    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/index").default;

    expect(Responsive.deviceWidth).toBe(0);
    expect(Responsive.deviceHeight).toBe(0);
    expect(Responsive.widthPercent(50)).toBe(0);
    expect(Responsive.heightPercent(50)).toBe(0);
  });
});
