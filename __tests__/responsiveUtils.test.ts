import { Dimensions, Platform, PixelRatio, StatusBar } from "react-native";

describe("Responsive Utility Module - Full Coverage", () => {
  const resetModulesAndMocks = () => {
    jest.resetModules();
  };

  it("should calculate statusBarHeight correctly on android with StatusBar.currentHeight", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "android" },
      Dimensions: {
        get: jest.fn(() => ({ width: 400, height: 800 })),
      },
      PixelRatio: {
        get: jest.fn(() => 2),
      },
      StatusBar: {
        currentHeight: 25,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.statusBarHeight).toBe(25);
    expect(Responsive.availableHeight).toBe(800 - 25);
  });

  it("should handle iOS with notch and dynamic island", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 375, height: 812 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => true),
      hasDynamicIsland: jest.fn(() => true),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.statusBarHeight).toBe(54);
    expect(Responsive.availableHeight).toBe(812 - 54);
  });

  it("should handle iOS with notch but without dynamic island", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 375, height: 812 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => true),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.statusBarHeight).toBe(44);
    expect(Responsive.availableHeight).toBe(812 - 44);
  });

  it("should handle iOS without notch", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 375, height: 667 })),
      },
      PixelRatio: {
        get: jest.fn(() => 2),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.statusBarHeight).toBe(20);
    expect(Responsive.availableHeight).toBe(667 - 20);
  });

  it("should detect tablet and scale font accordingly", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 800, height: 1200 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => true),
      hasNotch: jest.fn(() => true),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.isTablet).toBe(true);
    // Test scaledFontSize for tablet (should add 2 to fontSize)
    const baseFont = 14;
    const expectedAdjustedFont = baseFont + 2;
    const expectedHeightScale = (expectedAdjustedFont * Responsive.availableHeight) / 812;

    expect(Responsive.scaledFontSize(baseFont)).toBeCloseTo(expectedHeightScale, 2);
  });

  it("should calculate widthPercent and heightPercent correctly", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 400, height: 800 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.widthPercent(50)).toBe(200);
    expect(Responsive.heightPercent(50)).toBe((800 - 20) * 0.5); // statusBarHeight defaults to 20 on iOS without notch
  });

  it("should calculate moderateWidth with default factor", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 375, height: 812 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => true),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    // deviceWidth == 375 so scale == 1, so moderateWidth(size) = size
    expect(Responsive.moderateWidth(20)).toBe(20);
    // with factor = 1, should scale fully
    expect(Responsive.moderateWidth(20, 1)).toBeCloseTo(20 * (375 / 375));
  });

  it("should calculate scaledFontSize correctly for non-tablet with large deviceWidth", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 600, height: 900 })),
      },
      PixelRatio: {
        get: jest.fn(() => 3),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    const fontSize = 16;
    const adjustedFont = fontSize; // not tablet
    const heightScale = (adjustedFont * Responsive.availableHeight) / 812;
    // Because deviceWidth > 500, scaledFontSize returns heightScale (rounded)
    expect(Responsive.scaledFontSize(fontSize)).toBeCloseTo(Number(heightScale.toFixed(2)));
  });

  it("should handle zero width/height gracefully", () => {
    resetModulesAndMocks();

    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Dimensions: {
        get: jest.fn(() => ({ width: 0, height: 0 })),
      },
      PixelRatio: {
        get: jest.fn(() => 1),
      },
      StatusBar: {
        currentHeight: 0,
      },
    }));

    jest.doMock("react-native-device-info", () => ({
      isTablet: jest.fn(() => false),
      hasNotch: jest.fn(() => false),
      hasDynamicIsland: jest.fn(() => false),
    }));

    const Responsive = require("../src/utils/responsive").default;

    expect(Responsive.deviceWidth).toBe(0);
    expect(Responsive.deviceHeight).toBe(0);
    expect(Responsive.widthPercent(50)).toBe(0);
    expect(Responsive.heightPercent(50)).toBe(0);
  });
});
