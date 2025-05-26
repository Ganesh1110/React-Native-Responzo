// src/responsive.ts - Single source of truth for responsive utilities

import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Dynamically fetch current screen dimensions accounting for orientation changes
const getDimensions = () => {
  const { width, height } = Dimensions.get('window');

  // Normalize width/height to ensure portrait-first logic
  return {
    deviceWidth: Math.min(width, height),
    deviceHeight: Math.max(width, height),
    width,
    height
  };
};

// Returns appropriate status bar height based on platform and device type
const getStatusBarHeight = (): number => {
  if (Platform.OS === 'android') {
    // Use native Android value if available
    return StatusBar.currentHeight || 0;
  }

  const hasNotch = DeviceInfo.hasNotch();

  // iOS dynamic island and notch detection
  if (hasNotch) {
    return DeviceInfo.hasDynamicIsland?.() ? 54 : 44;
  }

  // Default status bar height for older iPhones
  return 20;
};

// ---------------- Core Properties ----------------

// Current device width (portrait-safe)
export const deviceWidth = (): number => getDimensions().deviceWidth;

// Current device height (portrait-safe)
export const deviceHeight = (): number => getDimensions().deviceHeight;

// Pixel density (DPR) of the screen
export const pixelDensity = (): number => PixelRatio.get();

// Detects whether device is a tablet
export const isTablet = (): boolean => DeviceInfo.isTablet();

// Checks if device has a notch
export const hasNotch = (): boolean => DeviceInfo.hasNotch();

// Retrieves status bar height with fallbacks
export const statusBarHeight = (): number => getStatusBarHeight();

// Calculates usable screen height excluding the status bar
export const availableHeight = (): number => Math.max(0, deviceHeight() - statusBarHeight());

// ---------------- Percentage-Based Sizing ----------------

// Convert width percentage (0–100) to DP value
export const widthPercent = (percent: number): number => {
  if (percent < 0 || percent > 100) {
    console.warn(`widthPercent: Invalid percentage ${percent}. Should be between 0-100.`);
    return 0;
  }
  return (deviceWidth() * percent) / 100;
};

// Convert height percentage (0–100) to DP value (excluding status bar)
export const heightPercent = (percent: number): number => {
  if (percent < 0 || percent > 100) {
    console.warn(`heightPercent: Invalid percentage ${percent}. Should be between 0-100.`);
    return 0;
  }
  return (availableHeight() * percent) / 100;
};

// ---------------- Scaled Sizing ----------------

// Moderates size scaling based on screen width, with optional scaling factor
export const moderateWidth = (size: number, factor = 0.5): number => {
  if (typeof size !== 'number' || size < 0 || isNaN(size)) {
    console.warn(`moderateWidth: Invalid size ${size}. Should be a positive number.`);
    return 0;
  }

  const scale = deviceWidth() / 375; // 375 = base iPhone width
  return size + (scale * size - size) * factor;
};

// Font size scaling based on screen height and device type
export const scaledFontSize = (fontSize: number, baseHeight = 812): number => {
  if (typeof fontSize !== 'number' || fontSize <= 0 || isNaN(fontSize)) {
    console.warn(`scaledFontSize: Invalid fontSize ${fontSize}. Should be a positive number.`);
    return 14; // fallback
  }

  const adjustedFont = isTablet() ? fontSize + 2 : fontSize;
  const currentAvailableHeight = availableHeight();

  const heightScale = (adjustedFont * currentAvailableHeight) / baseHeight;

  // Wider screens or tablets use height-based scaling, others use width-based
  return isTablet() || deviceWidth() > 500
    ? Number(heightScale.toFixed(2))
    : Number(((deviceWidth() / 375) * adjustedFont).toFixed(2));
};

// ---------------- Aliases & Convenience Functions ----------------

// Shorthand width scaler
export const scaleWidth = (size: number): number => moderateWidth(size);

// Shorthand height scaler using percent of available height
export const scaleHeight = (size: number): number => heightPercent((size / availableHeight()) * 100);

// Aliases for older or concise syntax
export const rs = scaleWidth;
export const rvs = scaleHeight;

// Optional descriptive aliases (for developers coming from other libraries)
export const widthPercentageToDP = widthPercent;
export const heightPercentageToDP = heightPercent;

// Font scaling alias
export const scaleFont = scaledFontSize;

// ---------------- Default Export Object ----------------

// Single object export for easier imports and autocomplete
const Responsive = {
  // Core properties exposed as getters for live updates
  get width() { return deviceWidth(); },
  get height() { return deviceHeight(); },
  get pixelRatio() { return pixelDensity(); },
  get isTablet() { return isTablet(); },
  get hasNotch() { return hasNotch(); },
  get statusBarHeight() { return statusBarHeight(); },
  get screenHeight() { return availableHeight(); },

  // Core functions
  scaleWidth,
  scaleHeight,
  scaleFont,
  widthPercentageToDP,
  heightPercentageToDP,

  // Short aliases for brevity
  sw: scaleWidth,
  sh: scaleHeight,
  sf: scaleFont,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,

  // Backward compatibility
  rs,
  rvs,
  moderateWidth,
  scaledFontSize,
  widthPercent,
  heightPercent
};

export default Responsive;
