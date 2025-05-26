export interface ResponsiveType {
  deviceWidth: number;
  deviceHeight: number;
  pixelDensity: number;
  isTablet: boolean;
  hasNotch: boolean;
  statusBarHeight: number;
  availableHeight: number;
  widthPercent: (percent: number) => number;
  heightPercent: (percent: number) => number;
  moderateWidth: (size: number, factor?: number) => number;
  scaledFontSize: (fontSize: number, baseHeight?: number) => number;
}