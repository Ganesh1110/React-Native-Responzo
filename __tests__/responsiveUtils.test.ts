import { renderHook, act } from '@testing-library/react-hooks';
import { Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from "react-native-device-info";
import Adaptive, {
  initAdaptive,
  screen,
  scale,
  spacing,
  typography,
  borderRadius,
  presets,
  utils,
  useAdaptive,
} from "../src/responsive";

// Mock Dimensions
const mockDimensions = (width: number, height: number) => {
  Dimensions.get = jest.fn().mockReturnValue({ width, height });
};

// Mock PixelRatio
const mockPixelRatio = (ratio: number) => {
  PixelRatio.get = jest.fn().mockReturnValue(ratio);
};

// Mock DeviceInfo
jest.mock("react-native-device-info");

describe("Adaptive Scaling System", () => {
  beforeEach(() => {
    // Reset to default config before each test
    initAdaptive();
    mockDimensions(375, 812);
    mockPixelRatio(2);
    (DeviceInfo.isTablet as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Configuration", () => {
    it("should initialize with default config", () => {
      expect(screen.width).toBe(375);
      expect(screen.height).toBe(812);
      expect(screen.isTablet).toBe(false);
    });

    it("should allow custom configuration", () => {
      initAdaptive({
        baseWidth: 414,
        baseHeight: 896,
        scalingFactor: 0.8,
        tabletBreakpoint: 1024,
        spacingBase: 8,
      });

      expect(screen.width).toBe(375); // Still current width
      expect(scale.width(100)).toBeCloseTo(
        100 + ((375 / 414) * 100 - 100) * 0.8
      );
      expect(spacing.sm).toBeCloseTo(scale.width(16)); // 8 * 2
    });
  });

  describe("Screen Utilities", () => {
    it("should detect tablet devices", () => {
      mockDimensions(1024, 768);
      expect(screen.isTablet).toBe(true);

      mockDimensions(375, 812);
      (DeviceInfo.isTablet as jest.Mock).mockReturnValue(true);
      expect(screen.isTablet).toBe(true);
    });

    it("should detect orientation", () => {
      mockDimensions(812, 375);
      expect(screen.isLandscape).toBe(true);
      expect(screen.isPortrait).toBe(false);

      mockDimensions(375, 812);
      expect(screen.isLandscape).toBe(false);
      expect(screen.isPortrait).toBe(true);
    });

    it("should return pixel ratio", () => {
      mockPixelRatio(3);
      expect(screen.pixelRatio).toBe(3);
    });
  });

  describe("Scaling Functions", () => {
    it("should scale width proportionally", () => {
      mockDimensions(750, 812); // Double width
      expect(scale.width(100)).toBeCloseTo(150); // Default scaling factor 0.5
    });

    it("should scale height proportionally", () => {
      mockDimensions(375, 1624); // Double height
      expect(scale.height(100)).toBeCloseTo(150); // Default scaling factor 0.5
    });

    it("should scale fonts with tablet adjustment", () => {
      mockDimensions(768, 1024); // Tablet size
      expect(scale.font(16)).toBeGreaterThan(18); // Tablet gets +2 and scaling

      mockDimensions(375, 812); // Phone size
      expect(scale.font(16)).toBeCloseTo(16 * (375 / 375));
    });

    it("should handle percentage scaling", () => {
      mockDimensions(1000, 1000);
      expect(scale.widthPercent(50)).toBe(500);
      expect(scale.heightPercent(25)).toBe(250);
    });
  });

  describe("Spacing System", () => {
    it("should provide preset spacing values", () => {
      expect(spacing.xs).toBe(scale.width(4));
      expect(spacing.sm).toBe(scale.width(8));
      expect(spacing.md).toBe(scale.width(16));
      expect(spacing.lg).toBe(scale.width(24));
      expect(spacing.xl).toBe(scale.width(32));
      expect(spacing.xxl).toBe(scale.width(48));
    });

    it("should create custom spacing", () => {
      expect(spacing.custom(3)).toBe(scale.width(12)); // 4 * 3
    });

    it("should handle pixel values", () => {
      expect(spacing.px(10)).toBe(scale.width(10));
    });

    it("should handle percentage values", () => {
      mockDimensions(1000, 1000);
      expect(spacing.percent(10)).toBe(100); // 10% of 1000
    });
  });

  describe("Typography System", () => {
    it("should provide preset font sizes", () => {
      expect(typography.xs).toBe(scale.font(12));
      expect(typography.sm).toBe(scale.font(14));
      expect(typography.base).toBe(scale.font(16));
      expect(typography.lg).toBe(scale.font(18));
      expect(typography.xl).toBe(scale.font(20));
      expect(typography.xxl).toBe(scale.font(24));
      expect(typography.xxxl).toBe(scale.font(32));
    });

    it("should create custom font sizes", () => {
      expect(typography.custom(28)).toBe(scale.font(28));
    });
  });

  describe("Border Radius System", () => {
    it("should provide preset border radii", () => {
      expect(borderRadius.none).toBe(0);
      expect(borderRadius.sm).toBe(scale.width(4));
      expect(borderRadius.base).toBe(scale.width(8));
      expect(borderRadius.md).toBe(scale.width(12));
      expect(borderRadius.lg).toBe(scale.width(16));
      expect(borderRadius.xl).toBe(scale.width(24));
      expect(borderRadius.full).toBe(9999);
    });

    it("should create custom border radii", () => {
      expect(borderRadius.custom(10)).toBe(scale.width(10));
    });
  });

  describe("Presets", () => {
    it("should export presets correctly", () => {
      expect(presets.spacing).toBe(spacing);
      expect(presets.fontSize).toBe(typography);
      expect(presets.borderRadius).toBe(borderRadius);
    });
  });

  describe("Utils", () => {
    it("should create spacing objects", () => {
      const padding = utils.createSpacing(10, 20, 30, 40);
      expect(padding).toEqual({
        paddingTop: spacing.px(10),
        paddingRight: spacing.px(20),
        paddingBottom: spacing.px(30),
        paddingLeft: spacing.px(40),
      });

      const margin = utils.createMargin(5, 10, 15, 20);
      expect(margin).toEqual({
        marginTop: spacing.px(5),
        marginRight: spacing.px(10),
        marginBottom: spacing.px(15),
        marginLeft: spacing.px(20),
      });
    });

    it("should create shorthand spacing", () => {
      const padding = utils.createPadding(10, 20);
      expect(padding).toEqual({
        paddingVertical: spacing.px(10),
        paddingHorizontal: spacing.px(20),
      });

      const margin = utils.createMarginShorthand(5, 10);
      expect(margin).toEqual({
        marginVertical: spacing.px(5),
        marginHorizontal: spacing.px(10),
      });
    });

    it("should detect breakpoints", () => {
      mockDimensions(480, 800);
      expect(utils.isBreakpoint("sm")).toBe(true);
      expect(utils.isBreakpoint("md")).toBe(false);

      mockDimensions(1024, 768);
      expect(utils.isBreakpoint("lg")).toBe(true);
      expect(utils.isBreakpoint("xl")).toBe(false);
    });

    it("should provide orientation styles", () => {
      mockDimensions(812, 375); // Landscape
      const landscapeStyles = utils.getOrientationStyles();
      expect(landscapeStyles.container.flexDirection).toBe("row");

      mockDimensions(375, 812); // Portrait
      const portraitStyles = utils.getOrientationStyles();
      expect(portraitStyles.container.flexDirection).toBe("column");
    });
  });

  describe("Main Export", () => {
    it("should export all utilities correctly", () => {
      expect(Adaptive.screen).toBe(screen);
      expect(Adaptive.scale).toBe(scale);
      expect(Adaptive.spacing).toBe(spacing);
      expect(Adaptive.typography).toBe(typography);
      expect(Adaptive.borderRadius).toBe(borderRadius);
      expect(Adaptive.presets).toBe(presets);
      expect(Adaptive.utils).toBe(utils);
      expect(Adaptive.init).toBe(initAdaptive);
      expect(Adaptive.isSSR).toBe(utils.isSSR);
    });
  });

// Add these tests to your existing test file

describe('Error Cases', () => {

  it('should handle PixelRatio.get() errors', () => {
    const originalGet = PixelRatio.get;
    PixelRatio.get = jest.fn(() => { throw new Error('PixelRatio error'); });
    
    // This tests line 76
    expect(screen.pixelRatio).toBe(1);
    
    PixelRatio.get = originalGet;
  });
});

it('should handle tablet detection errors', () => {
  (DeviceInfo.isTablet as jest.Mock).mockImplementation(() => {
    throw new Error('DeviceInfo error');
  });
  
  expect(screen.isTablet).toBe(false);
});

  // Test the default export
  it("should export default Adaptive object", () => {
    expect(Adaptive).toEqual({
      screen,
      scale,
      spacing,
      typography,
      borderRadius,
      presets,
      utils,
      init: initAdaptive,
      isSSR: utils.isSSR,
    });
  });
});
