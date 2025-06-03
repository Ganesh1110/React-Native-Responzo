// react-native-adaptive - Enhanced API with Flexible Spacing

import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useState, useEffect } from 'react';

// Configuration interface
export interface AdaptiveConfig {
  baseWidth: number;
  baseHeight: number;
  scalingFactor: number;
  tabletBreakpoint: number;
  spacingBase: number; // Base spacing unit (default: 4)
}

// Default configuration
const DEFAULT_CONFIG: AdaptiveConfig = {
  baseWidth: 375,
  baseHeight: 812,
  scalingFactor: 0.5,
  tabletBreakpoint: 768,
  spacingBase: 4
};

let config = { ...DEFAULT_CONFIG };

// Initialize with custom config
export const initAdaptive = (customConfig: Partial<AdaptiveConfig> = {}) => {
  config = { ...DEFAULT_CONFIG, ...customConfig };
};

// Core dimension utilities
export const screen = {
  get width() {
    return Dimensions.get('window').width;
  },
  get height() {
    return Dimensions.get('window').height;
  },
  get isTablet() {
    return DeviceInfo.isTablet() || this.width >= config.tabletBreakpoint;
  },
  get pixelRatio() {
    return PixelRatio.get();
  }
};

// Scaling functions
export const scale = {
  width: (size: number): number => {
    const scale = screen.width / config.baseWidth;
    return size + (scale * size - size) * config.scalingFactor;
  },

  height: (size: number): number => {
    const scale = screen.height / config.baseHeight;
    return size + (scale * size - size) * config.scalingFactor;
  },

  font: (size: number): number => {
    const adjustedSize = screen.isTablet ? size + 2 : size;
    const scale = screen.width / config.baseWidth;
    return adjustedSize * scale;
  },

  widthPercent: (percent: number): number => {
    return (screen.width * percent) / 100;
  },

  heightPercent: (percent: number): number => {
    return (screen.height * percent) / 100;
  }
};

// Flexible spacing system
export const spacing = {
  // Preset values (most commonly used)
  xs: scale.width(config.spacingBase),     // 4
  sm: scale.width(config.spacingBase * 2), // 8  
  md: scale.width(config.spacingBase * 4), // 16
  lg: scale.width(config.spacingBase * 6), // 24
  xl: scale.width(config.spacingBase * 8), // 32
  xxl: scale.width(config.spacingBase * 12), // 48

  // Custom spacing generator - multiply base unit
  custom: (multiplier: number): number => {
    return scale.width(config.spacingBase * multiplier);
  },

  // Direct pixel value scaling
  px: (pixels: number): number => {
    return scale.width(pixels);
  },

  // Percentage-based spacing
  percent: (percent: number): number => {
    return scale.widthPercent(percent);
  }
};

// Typography system
export const typography = {
  xs: scale.font(12),
  sm: scale.font(14),
  base: scale.font(16),
  lg: scale.font(18),
  xl: scale.font(20),
  xxl: scale.font(24),
  xxxl: scale.font(32),
  
  // Custom font scaling
  custom: (size: number): number => {
    return scale.font(size);
  }
};

// Border radius system
export const borderRadius = {
  none: 0,
  sm: scale.width(4),
  base: scale.width(8),
  md: scale.width(12),
  lg: scale.width(16),
  xl: scale.width(24),
  full: 9999,
  
  // Custom border radius
  custom: (radius: number): number => {
    return scale.width(radius);
  }
};

// Design system presets (backward compatibility)
export const presets = {
  spacing,
  fontSize: typography,
  borderRadius
};

// React Hook for reactive dimensions
export const useAdaptive = () => {
  const [dimensions, setDimensions] = useState({
    width: screen.width,
    height: screen.height
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  return {
    screen: { ...screen, ...dimensions },
    scale,
    spacing,
    typography,
    borderRadius,
    presets
  };
};

// Utility functions for common patterns
export const utils = {
  // Create consistent component spacing
  createSpacing: (top = 0, right = 0, bottom = 0, left = 0) => ({
    paddingTop: spacing.px(top),
    paddingRight: spacing.px(right),
    paddingBottom: spacing.px(bottom),
    paddingLeft: spacing.px(left)
  }),

  // Create margin spacing
  createMargin: (top = 0, right = 0, bottom = 0, left = 0) => ({
    marginTop: spacing.px(top),
    marginRight: spacing.px(right),
    marginBottom: spacing.px(bottom),
    marginLeft: spacing.px(left)
  }),

  // Responsive breakpoints
  isBreakpoint: (breakpoint: 'sm' | 'md' | 'lg' | 'xl') => {
    const breakpoints = {
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return screen.width >= breakpoints[breakpoint];
  }
};

// Main export object
const Adaptive = {
  screen,
  scale,
  spacing,
  typography,
  borderRadius,
  presets,
  utils,
  init: initAdaptive
};

export default Adaptive;