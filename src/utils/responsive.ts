import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');
const pixelDensity = PixelRatio.get();

const deviceWidth = Math.min(width, height);
const deviceHeight = Math.max(width, height);
const isTablet = DeviceInfo.isTablet();
const hasNotch = DeviceInfo.hasNotch();

const getStatusBarHeight = (): number => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  }
  return hasNotch ? (DeviceInfo.hasDynamicIsland?.() ? 54 : 44) : 20;
};

const statusBarHeight = getStatusBarHeight();
const availableHeight = Math.max(0, deviceHeight - statusBarHeight);

export const widthPercent = (percent: number): number => (deviceWidth * percent) / 100;
export const heightPercent = (percent: number): number => (availableHeight * percent) / 100;

export const moderateWidth = (size: number, factor = 0.5): number => {
  const scale = deviceWidth / 375;
  return size + (scale * size - size) * factor;
};

export const scaledFontSize = (fontSize: number, baseHeight = 812): number => {
  const adjustedFont = isTablet ? fontSize + 2 : fontSize;
  const heightScale = (adjustedFont * availableHeight) / baseHeight;
  return isTablet || deviceWidth > 500
    ? Number(heightScale.toFixed(2))
    : (deviceWidth / 375) * adjustedFont;
};

export const Responsive = {
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
};

export default Responsive;
