// react-native-adaptive - Enhanced API with SSR, Orientation & TypeScript improvements

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

// Spacing utilities interface
export interface SpacingUtilities {
  top: number;
  right: number;
  bottom: number;
  left: number;
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
export const initAdaptive = (customConfig: Partial<AdaptiveConfig> = {}): void => {
  config = { ...DEFAULT_CONFIG, ...customConfig };
};

// SSR-safe dimension getter
const getSafeDimensions = () => {
  // Check if we're in a React Native environment
  if (typeof Dimensions === 'undefined') {
    return { width: 375, height: 812 }; // Fallback for SSR
  }
  
  try {
    return Dimensions.get('window');
  } catch (error) {
    // Fallback for SSR or when Dimensions is not available
    return { width: 375, height: 812 };
  }
};

// Core dimension utilities with SSR safety
export const screen = {
  get width(): number {
    return getSafeDimensions().width;
  },
  get height(): number {
    return getSafeDimensions().height;
  },
  get isTablet(): boolean {
    try {
      return DeviceInfo.isTablet() || this.width >= config.tabletBreakpoint;
    } catch (error) {
      // Fallback for SSR
      return this.width >= config.tabletBreakpoint;
    }
  },
  get pixelRatio(): number {
    try {
      return PixelRatio.get();
    } catch (error) {
      // Fallback for SSR
      return 1;
    }
  },
  get isLandscape(): boolean {
    return this.width > this.height;
  },
  get isPortrait(): boolean {
    return this.height > this.width;
  }
};

// Scaling functions with precise return types
export const scale = {
  width: (size: number): number => {
    const scaleRatio = screen.width / config.baseWidth;
    return size + (scaleRatio * size - size) * config.scalingFactor;
  },

  height: (size: number): number => {
    const scaleRatio = screen.height / config.baseHeight;
    return size + (scaleRatio * size - size) * config.scalingFactor;
  },

  font: (size: number): number => {
    const adjustedSize = screen.isTablet ? size + 2 : size;
    const scaleRatio = screen.width / config.baseWidth;
    return adjustedSize * scaleRatio;
  },

  widthPercent: (percent: number): number => {
    return (screen.width * percent) / 100;
  },

  heightPercent: (percent: number): number => {
    return (screen.height * percent) / 100;
  }
};

// Flexible spacing system with precise types
export const spacing = {
  // Preset values (most commonly used)
  get xs(): number { return scale.width(config.spacingBase); },     // 4
  get sm(): number { return scale.width(config.spacingBase * 2); }, // 8  
  get md(): number { return scale.width(config.spacingBase * 4); }, // 16
  get lg(): number { return scale.width(config.spacingBase * 6); }, // 24
  get xl(): number { return scale.width(config.spacingBase * 8); }, // 32
  get xxl(): number { return scale.width(config.spacingBase * 12); }, // 48

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

// Typography system with precise types
export const typography = {
  get xs(): number { return scale.font(12); },
  get sm(): number { return scale.font(14); },
  get base(): number { return scale.font(16); },
  get lg(): number { return scale.font(18); },
  get xl(): number { return scale.font(20); },
  get xxl(): number { return scale.font(24); },
  get xxxl(): number { return scale.font(32); },
  
  // Custom font scaling
  custom: (size: number): number => {
    return scale.font(size);
  }
};

// Border radius system with precise types
export const borderRadius = {
  none: 0 as const,
  get sm(): number { return scale.width(4); },
  get base(): number { return scale.width(8); },
  get md(): number { return scale.width(12); },
  get lg(): number { return scale.width(16); },
  get xl(): number { return scale.width(24); },
  full: 9999 as const,
  
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

// Enhanced React Hook for reactive dimensions with orientation support
export const useAdaptive = () => {
  const [dimensions, setDimensions] = useState(() => {
    const safeDimensions = getSafeDimensions();
    return {
      width: safeDimensions.width,
      height: safeDimensions.height
    };
  });

  useEffect(() => {
    // Only set up listener if Dimensions is available (not in SSR)
    if (typeof Dimensions === 'undefined') {
      return;
    }

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const enhancedScreen = {
    ...screen,
    ...dimensions,
    isLandscape: dimensions.width > dimensions.height,
    isPortrait: dimensions.height > dimensions.width
  };

  return {
    screen: enhancedScreen,
    scale,
    spacing,
    typography,
    borderRadius,
    presets,
    // Orientation helpers
    orientation: {
      isLandscape: enhancedScreen.isLandscape,
      isPortrait: enhancedScreen.isPortrait,
      aspectRatio: dimensions.width / dimensions.height
    }
  };
};

// Enhanced utility functions with better typing
export const utils = {
  // Create consistent component spacing with typed return
  createSpacing: (
    top: number = 0, 
    right: number = 0, 
    bottom: number = 0, 
    left: number = 0
  ): {
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
  } => ({
    paddingTop: spacing.px(top),
    paddingRight: spacing.px(right),
    paddingBottom: spacing.px(bottom),
    paddingLeft: spacing.px(left)
  }),

  // Create margin spacing with typed return
  createMargin: (
    top: number = 0, 
    right: number = 0, 
    bottom: number = 0, 
    left: number = 0
  ): {
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  } => ({
    marginTop: spacing.px(top),
    marginRight: spacing.px(right),
    marginBottom: spacing.px(bottom),
    marginLeft: spacing.px(left)
  }),

  // Shorthand spacing utilities
  createPadding: (
    vertical: number = 0,
    horizontal: number = 0
  ): {
    paddingVertical: number;
    paddingHorizontal: number;
  } => ({
    paddingVertical: spacing.px(vertical),
    paddingHorizontal: spacing.px(horizontal)
  }),

  createMarginShorthand: (
    vertical: number = 0,
    horizontal: number = 0
  ): {
    marginVertical: number;
    marginHorizontal: number;
  } => ({
    marginVertical: spacing.px(vertical),
    marginHorizontal: spacing.px(horizontal)
  }),

  // Responsive breakpoints with precise typing
  isBreakpoint: (breakpoint: 'sm' | 'md' | 'lg' | 'xl'): boolean => {
    const breakpoints: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return screen.width >= breakpoints[breakpoint];
  },

  // Orientation-based utilities
  getOrientationStyles: () => ({
    container: {
      width: screen.width,
      height: screen.height,
      flexDirection: screen.isLandscape ? 'row' as const : 'column' as const
    }
  }),

  // SSR-safe check
  isSSR: (): boolean => {
    return typeof Dimensions === 'undefined' || typeof window === 'undefined';
  }
};

// Main export object with enhanced typing
const Adaptive = {
  screen,
  scale,
  spacing,
  typography,
  borderRadius,
  presets,
  utils,
  init: initAdaptive,
  // Convenience exports
  // getSafeDimensions,
  isSSR: utils.isSSR
} as const;

export default Adaptive;