// src/responsive.ts - Single source of truth
import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Dynamic getters to handle orientation changes
const getDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return {
    deviceWidth: Math.min(width, height),
    deviceHeight: Math.max(width, height),
    width,
    height
  };
};

const getStatusBarHeight = (): number => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  }
  
  // Check for notch/dynamic island on iOS
  const hasNotch = DeviceInfo.hasNotch();
  if (hasNotch) {
    // Check if hasDynamicIsland exists (newer versions of react-native-device-info)
    return DeviceInfo.hasDynamicIsland?.() ? 54 : 44;
  }
  return 20;
};

// Core properties (dynamic)
export const deviceWidth = (): number => getDimensions().deviceWidth;
export const deviceHeight = (): number => getDimensions().deviceHeight;
export const pixelDensity = (): number => PixelRatio.get();
export const isTablet = (): boolean => DeviceInfo.isTablet();
export const hasNotch = (): boolean => DeviceInfo.hasNotch();
export const statusBarHeight = (): number => getStatusBarHeight();
export const availableHeight = (): number => Math.max(0, deviceHeight() - statusBarHeight());

// Responsive functions
export const widthPercent = (percent: number): number => {
  if (percent < 0 || percent > 100) {
    console.warn(`widthPercent: Invalid percentage ${percent}. Should be between 0-100.`);
    return 0;
  }
  return (deviceWidth() * percent) / 100;
};

export const heightPercent = (percent: number): number => {
  if (percent < 0 || percent > 100) {
    console.warn(`heightPercent: Invalid percentage ${percent}. Should be between 0-100.`);
    return 0;
  }
  return (availableHeight() * percent) / 100;
};

export const moderateWidth = (size: number, factor = 0.5): number => {
  if (typeof size !== 'number' || size < 0 || isNaN(size)) {
    console.warn(`moderateWidth: Invalid size ${size}. Should be a positive number.`);
    return 0;
  }
  
  const scale = deviceWidth() / 375;
  return size + (scale * size - size) * factor;
};

export const scaledFontSize = (fontSize: number, baseHeight = 812): number => {
  if (typeof fontSize !== 'number' || fontSize <= 0 || isNaN(fontSize)) {
    console.warn(`scaledFontSize: Invalid fontSize ${fontSize}. Should be a positive number.`);
    return 14; // fallback font size
  }

  const adjustedFont = isTablet() ? fontSize + 2 : fontSize;
  const currentAvailableHeight = availableHeight();
  const heightScale = (adjustedFont * currentAvailableHeight) / baseHeight;
  
  return isTablet() || deviceWidth() > 500
    ? Number(heightScale.toFixed(2))
    : Number(((deviceWidth() / 375) * adjustedFont).toFixed(2));
};

// Default export object for convenience
const Responsive = {
  // Properties (as getters)
  get deviceWidth() { return deviceWidth(); },
  get deviceHeight() { return deviceHeight(); },
  get pixelDensity() { return pixelDensity(); },
  get isTablet() { return isTablet(); },
  get hasNotch() { return hasNotch(); },
  get statusBarHeight() { return statusBarHeight(); },
  get availableHeight() { return availableHeight(); },
  
  // Functions
  widthPercent,
  heightPercent,
  moderateWidth,
  scaledFontSize,
};

export default Responsive;