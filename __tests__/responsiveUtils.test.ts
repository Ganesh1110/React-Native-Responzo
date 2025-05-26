// __tests__/responsive.test.ts
import { Platform, Dimensions, StatusBar, PixelRatio } from 'react-native';

// Mock react-native modules
jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 }))
  },
  StatusBar: {
    currentHeight: 0
  },
  PixelRatio: {
    get: jest.fn(() => 3)
  }
}));

// Mock react-native-device-info
jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
  hasNotch: jest.fn(() => false),
  hasDynamicIsland: jest.fn(() => false)
}));

import DeviceInfo from 'react-native-device-info';
import {
  deviceWidth,
  deviceHeight,
  pixelDensity,
  isTablet,
  hasNotch,
  statusBarHeight,
  availableHeight,
  widthPercent,
  heightPercent,
  moderateWidth,
  scaledFontSize,
  scaleWidth as sw,
  scaleHeight as sh,
  scaleFont as sf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  scaleWidth,
  scaleHeight,
  scaleFont,
  widthPercentageToDP,
  heightPercentageToDP,
} from '../src/responsive';
import Responsive from '../src/responsive'; 

describe('React Native Responzo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default values
    (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 812 });
    (DeviceInfo.isTablet as jest.Mock).mockReturnValue(false);
    (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(false);
    (DeviceInfo.hasDynamicIsland as jest.Mock).mockReturnValue(false);
    (Platform as any).OS = 'ios';
  });

  describe('Device Properties', () => {
    it('should return correct device dimensions', () => {
      expect(deviceWidth()).toBe(375); // min(375, 812)
      expect(deviceHeight()).toBe(812); // max(375, 812)
    });

    it('should return correct pixel density', () => {
      expect(pixelDensity()).toBe(3);
    });

    it('should detect tablet correctly', () => {
      expect(isTablet()).toBe(false);
      
      (DeviceInfo.isTablet as jest.Mock).mockReturnValue(true);
      expect(isTablet()).toBe(true);
    });

    it('should detect notch correctly', () => {
      expect(hasNotch()).toBe(false);
      
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(true);
      expect(hasNotch()).toBe(true);
    });
  });

  describe('Status Bar Height', () => {
    it('should return 20 for iOS without notch', () => {
      (Platform as any).OS = 'ios';
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(false);
      
      expect(statusBarHeight()).toBe(20);
    });

    it('should return 44 for iOS with notch but no dynamic island', () => {
      (Platform as any).OS = 'ios';
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(true);
      (DeviceInfo.hasDynamicIsland as jest.Mock).mockReturnValue(false);
      
      expect(statusBarHeight()).toBe(44);
    });

    it('should return 54 for iOS with dynamic island', () => {
      (Platform as any).OS = 'ios';
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(true);
      (DeviceInfo.hasDynamicIsland as jest.Mock).mockReturnValue(true);
      
      expect(statusBarHeight()).toBe(54);
    });

    it('should return StatusBar.currentHeight for Android', () => {
      (Platform as any).OS = 'android';
      (StatusBar as any).currentHeight = 25;
      
      expect(statusBarHeight()).toBe(25);
    });

    it('should return 0 for Android when StatusBar.currentHeight is null', () => {
      (Platform as any).OS = 'android';
      (StatusBar as any).currentHeight = null;
      
      expect(statusBarHeight()).toBe(0);
    });
  });

  describe('Available Height', () => {
    it('should calculate available height correctly', () => {
      (Platform as any).OS = 'ios';
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(false);
      
      const expected = 812 - 20; // deviceHeight - statusBarHeight
      expect(availableHeight()).toBe(expected);
    });

    it('should handle zero dimensions gracefully', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 0, height: 0 });
      
      expect(availableHeight()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Responsive Functions', () => {
    beforeEach(() => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 400, height: 800 });
      (Platform as any).OS = 'ios';
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(false);
    });

    it('should calculate width percentage correctly', () => {
      expect(widthPercent(50)).toBe(200); // 50% of 400
      expect(widthPercent(100)).toBe(400);
      expect(widthPercent(0)).toBe(0);
    });

    it('should handle invalid width percentages', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      expect(widthPercent(-10)).toBe(0);
      expect(widthPercent(150)).toBe(0);
      
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      consoleSpy.mockRestore();
    });

    it('should calculate height percentage correctly', () => {
      const available = 800 - 20; // height - statusBar
      expect(heightPercent(50)).toBe(available * 0.5);
      expect(heightPercent(100)).toBe(available);
      expect(heightPercent(0)).toBe(0);
    });

    it('should handle invalid height percentages', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      expect(heightPercent(-10)).toBe(0);
      expect(heightPercent(150)).toBe(0);
      
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      consoleSpy.mockRestore();
    });

    it('should calculate moderate width correctly', () => {
      // deviceWidth = 400, scale = 400/375 ≈ 1.067
      const size = 100;
      const scale = 400 / 375;
      const expected = size + (scale * size - size) * 0.5;
      
      expect(moderateWidth(size)).toBeCloseTo(expected, 2);
    });

    it('should handle custom factor in moderate width', () => {
      const size = 100;
      const factor = 1;
      const scale = 400 / 375;
      const expected = size + (scale * size - size) * factor;
      
      expect(moderateWidth(size, factor)).toBeCloseTo(expected, 2);
    });

    it('should handle invalid size in moderate width', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      expect(moderateWidth(-10)).toBe(0);
      expect(moderateWidth(NaN)).toBe(0);
      
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      consoleSpy.mockRestore();
    });
  });

  describe('Scaled Font Size', () => {
    beforeEach(() => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 812 });
      (DeviceInfo.isTablet as jest.Mock).mockReturnValue(false);
      (DeviceInfo.hasNotch as jest.Mock).mockReturnValue(false);
    });

    it('should scale font for regular phone correctly', () => {
      const fontSize = 16;
      const scale = 375 / 375; // 1
      const expected = Number((scale * fontSize).toFixed(2));
      
      expect(scaledFontSize(fontSize)).toBe(expected);
    });

    it('should add 2px for tablet fonts', () => {
      (DeviceInfo.isTablet as jest.Mock).mockReturnValue(true);
      
      const fontSize = 16;
      const adjustedFont = fontSize + 2;
      const available = 812 - 20; // availableHeight
      const heightScale = (adjustedFont * available) / 812;
      const expected = Number(heightScale.toFixed(2));
      
      expect(scaledFontSize(fontSize)).toBe(expected);
    });

    it('should use height scaling for wide screens', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 600, height: 900 });
      
      const fontSize = 16;
      const available = 900 - 20;
      const heightScale = (fontSize * available) / 812;
      const expected = Number(heightScale.toFixed(2));
      
      expect(scaledFontSize(fontSize)).toBe(expected);
    });

    it('should handle invalid font sizes', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      expect(scaledFontSize(0)).toBe(14); // fallback
      expect(scaledFontSize(-5)).toBe(14); // fallback
      expect(scaledFontSize(NaN)).toBe(14); // fallback
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });

    it('should use custom base height', () => {
      const fontSize = 16;
      const customBase = 1000;
      const available = 812 - 20;
      const scale = 375 / 375; // 1 (not tablet, deviceWidth <= 500)
      const expected = Number((scale * fontSize).toFixed(2));
      
      expect(scaledFontSize(fontSize, customBase)).toBe(expected);
    });
  });

  describe('Orientation Changes', () => {
    it('should update dimensions when orientation changes', () => {
      // Start with portrait
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 812 });
      expect(deviceWidth()).toBe(375);
      expect(deviceHeight()).toBe(812);
      
      // Switch to landscape
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 812, height: 375 });
      expect(deviceWidth()).toBe(375); // still min
      expect(deviceHeight()).toBe(812); // still max
    });
  });

  describe('Responsive Object Aliases and Exports', () => {
  it('should expose shortcut functions correctly', () => {
    expect(sw(100)).toBe(scaleWidth(100));
    expect(sh(100)).toBe(scaleHeight(100));
    expect(sf(16)).toBe(scaleFont(16));
    expect(wp(50)).toBe(widthPercentageToDP(50));
    expect(hp(50)).toBe(heightPercentageToDP(50));
  });

  });

  describe('Responsive Object getters', () => {
  it('should access all getter properties without errors', () => {
    expect(typeof Responsive.width).toBe('number');
    expect(typeof Responsive.height).toBe('number');
    expect(typeof Responsive.pixelRatio).toBe('number');
    expect(typeof Responsive.isTablet).toBe('boolean');
    expect(typeof Responsive.hasNotch).toBe('boolean');
    expect(typeof Responsive.statusBarHeight).toBe('number');
    expect(typeof Responsive.screenHeight).toBe('number');
  });
});
});