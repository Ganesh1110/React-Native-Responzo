import { Dimensions, Platform, PixelRatio, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";

const { width, height } = Dimensions.get("window");
const pixelDensity = PixelRatio.get();

// Get the smaller side as width, larger as height (handles orientation)
const deviceWidth = Math.min(width, height);
const deviceHeight = Math.max(width, height);

// Detect if device is a tablet
const isTablet = DeviceInfo.isTablet();

// Detect if device has a notch
const hasNotch = DeviceInfo.hasNotch();

// Get status bar height based on device type and notch presence
const getStatusBarHeight = () => {
  if (Platform.OS === "android") {
    return StatusBar.currentHeight || 0;
  }

  // iOS
  if (hasNotch) {
    return DeviceInfo.hasDynamicIsland?.() ? 54 : 44;
  }

  return 20;
};

const statusBarHeight = getStatusBarHeight();
const availableHeight = deviceHeight - statusBarHeight;

/**
 * Calculate width as a percentage of device width.
 * @param {number} percentage 0-100
 */
// Width percentage utility
const widthPercent = (percent) => (deviceWidth * percent) / 100;

/**
 * Calculate height as a percentage of available height (excluding status bar).
 * @param {number} percentage 0-100
 */
// Height percentage utility
const heightPercent = (percent) => (availableHeight * percent) / 100;

/**
 * Moderate width scaling based on a base width of 375.
 * @param {number} size Original size
 * @param {number} factor Smooth scaling factor, default 0.5
 */
// Scale sizes moderately based on a standard width of 375 (iPhone 8)
const moderateWidth = (size, factor = 0.5) => {
  const scale = deviceWidth / 375;
  return size + (scale * size - size) * factor;
};

/**
 * Scale font size considering device type and screen height.
 * @param {number} fontSize Base font size
 * @param {number} baseScreenHeight Default 812 (iPhone X height)
 */
// Scale font size with respect to height
const scaledFontSize = (fontSize, baseHeight = 812) => {
  const adjustedFont = isTablet ? fontSize + 2 : fontSize;
  const heightScale = (adjustedFont * availableHeight) / baseHeight;
  return isTablet || deviceWidth > 500
    ? Number(heightScale.toFixed(2))
    : (deviceWidth / 375) * adjustedFont;
};

// Export everything as a module called Responsive
const Responsive = {
  deviceWidth,
  deviceHeight,
  statusBarHeight,
  availableHeight,
  isTablet,
  hasNotch,
  widthPercent,
  heightPercent,
  moderateWidth,
  scaledFontSize,
};

export default Responsive;
