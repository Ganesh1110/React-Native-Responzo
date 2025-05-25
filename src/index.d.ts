export interface ResponsiveModule {
  deviceWidth: number;
  deviceHeight: number;
  statusBarHeight: number;
  availableHeight: number;
  isTablet: boolean;
  hasNotch: boolean;
  widthPercent: (percent: number) => number;
  heightPercent: (percent: number) => number;
  moderateWidth: (size: number, factor?: number) => number;
  scaledFontSize: (fontSize: number, baseHeight?: number) => number;
}

declare const Responsive: ResponsiveModule;

export default Responsive;