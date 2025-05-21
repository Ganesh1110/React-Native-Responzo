"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = _interopRequireDefault(require("react-native-device-info"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _Dimensions$get = _reactNative.Dimensions.get("window"),
  width = _Dimensions$get.width,
  height = _Dimensions$get.height;
var pixelDensity = _reactNative.PixelRatio.get();

// Get the smaller side as width, larger as height (handles orientation)
var deviceWidth = Math.min(width, height);
var deviceHeight = Math.max(width, height);

// Detect if device is a tablet
var isTablet = _reactNativeDeviceInfo["default"].isTablet();

// Detect if device has a notch
var hasNotch = _reactNativeDeviceInfo["default"].hasNotch();

// Get status bar height based on device type and notch presence
var getStatusBarHeight = function getStatusBarHeight() {
  if (_reactNative.Platform.OS === "android") {
    return _reactNative.StatusBar.currentHeight || 0;
  }

  // iOS
  if (hasNotch) {
    var _DeviceInfo$hasDynami;
    return (_DeviceInfo$hasDynami = _reactNativeDeviceInfo["default"].hasDynamicIsland) !== null && _DeviceInfo$hasDynami !== void 0 && _DeviceInfo$hasDynami.call(_reactNativeDeviceInfo["default"]) ? 54 : 44;
  }
  return 20;
};
var statusBarHeight = getStatusBarHeight();
var availableHeight = deviceHeight - statusBarHeight;

/**
 * Calculate width as a percentage of device width.
 * @param {number} percentage 0-100
 */
// Width percentage utility
var widthPercent = function widthPercent(percent) {
  return deviceWidth * percent / 100;
};

/**
 * Calculate height as a percentage of available height (excluding status bar).
 * @param {number} percentage 0-100
 */
// Height percentage utility
var heightPercent = function heightPercent(percent) {
  return availableHeight * percent / 100;
};

/**
 * Moderate width scaling based on a base width of 375.
 * @param {number} size Original size
 * @param {number} factor Smooth scaling factor, default 0.5
 */
// Scale sizes moderately based on a standard width of 375 (iPhone 8)
var moderateWidth = function moderateWidth(size) {
  var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  var scale = deviceWidth / 375;
  return size + (scale * size - size) * factor;
};

/**
 * Scale font size considering device type and screen height.
 * @param {number} fontSize Base font size
 * @param {number} baseScreenHeight Default 812 (iPhone X height)
 */
// Scale font size with respect to height
var scaledFontSize = function scaledFontSize(fontSize) {
  var baseHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 812;
  var adjustedFont = isTablet ? fontSize + 2 : fontSize;
  var heightScale = adjustedFont * availableHeight / baseHeight;
  return isTablet || deviceWidth > 500 ? Number(heightScale.toFixed(2)) : deviceWidth / 375 * adjustedFont;
};

// Export everything as a module called Responsive
var Responsive = {
  deviceWidth: deviceWidth,
  deviceHeight: deviceHeight,
  statusBarHeight: statusBarHeight,
  availableHeight: availableHeight,
  isTablet: isTablet,
  hasNotch: hasNotch,
  widthPercent: widthPercent,
  heightPercent: heightPercent,
  moderateWidth: moderateWidth,
  scaledFontSize: scaledFontSize
};
var _default = exports["default"] = Responsive;