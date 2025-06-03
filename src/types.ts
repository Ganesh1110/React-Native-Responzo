import { ScaledSize } from 'react-native';

// Configuration interface
export interface AdaptiveConfig {
  /** Base width for scaling calculations (default: 375) */
  baseWidth: number;
  /** Base height for scaling calculations (default: 812) */
  baseHeight: number;
  /** Scaling factor for moderation (default: 0.5) */
  scalingFactor: number;
  /** Breakpoint for tablet detection (default: 768) */
  tabletBreakpoint: number;
  /** Base spacing unit multiplier (default: 4) */
  spacingBase: number;
}

// Partial config for initialization
export type AdaptiveConfigPartial = Partial<AdaptiveConfig>;

// Screen utilities interface
export interface ScreenUtils {
  /** Current screen width */
  readonly width: number;
  /** Current screen height */
  readonly height: number;
  /** Whether current device is tablet */
  readonly isTablet: boolean;
  /** Current pixel ratio */
  readonly pixelRatio: number;
}

// Scaling functions interface
export interface ScaleUtils {
  /** Scale width-based values */
  width: (size: number) => number;
  /** Scale height-based values */
  height: (size: number) => number;
  /** Scale font sizes with tablet adjustments */
  font: (size: number) => number;
  /** Convert width percentage to pixels */
  widthPercent: (percent: number) => number;
  /** Convert height percentage to pixels */
  heightPercent: (percent: number) => number;
}

// Spacing system interface
export interface SpacingSystem {
  /** Extra small spacing (4px scaled) */
  readonly xs: number;
  /** Small spacing (8px scaled) */
  readonly sm: number;
  /** Medium spacing (16px scaled) */
  readonly md: number;
  /** Large spacing (24px scaled) */
  readonly lg: number;
  /** Extra large spacing (32px scaled) */
  readonly xl: number;
  /** Extra extra large spacing (48px scaled) */
  readonly xxl: number;
  
  /** Create custom spacing using base unit multiplier */
  custom: (multiplier: number) => number;
  /** Scale direct pixel values */
  px: (pixels: number) => number;
  /** Create percentage-based spacing */
  percent: (percent: number) => number;
}

// Typography system interface
export interface TypographySystem {
  /** Extra small font (12px scaled) */
  readonly xs: number;
  /** Small font (14px scaled) */
  readonly sm: number;
  /** Base font (16px scaled) */
  readonly base: number;
  /** Large font (18px scaled) */
  readonly lg: number;
  /** Extra large font (20px scaled) */
  readonly xl: number;
  /** Extra extra large font (24px scaled) */
  readonly xxl: number;
  /** Extra extra extra large font (32px scaled) */
  readonly xxxl: number;
  
  /** Create custom font size */
  custom: (size: number) => number;
}

// Border radius system interface
export interface BorderRadiusSystem {
  /** No border radius */
  readonly none: number;
  /** Small border radius (4px scaled) */
  readonly sm: number;
  /** Base border radius (8px scaled) */
  readonly base: number;
  /** Medium border radius (12px scaled) */
  readonly md: number;
  /** Large border radius (16px scaled) */
  readonly lg: number;
  /** Extra large border radius (24px scaled) */
  readonly xl: number;
  /** Fully rounded */
  readonly full: number;
  
  /** Create custom border radius */
  custom: (radius: number) => number;
}

// Preset systems (backward compatibility)
export interface PresetSystems {
  spacing: SpacingSystem;
  fontSize: TypographySystem;
  borderRadius: BorderRadiusSystem;
}

// Utility functions interface
export interface UtilityFunctions {
  /** Create padding object from TRBL values */
  createSpacing: (top?: number, right?: number, bottom?: number, left?: number) => {
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
  };
  
  /** Create margin object from TRBL values */
  createMargin: (top?: number, right?: number, bottom?: number, left?: number) => {
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
  
  /** Check if screen meets breakpoint */
  isBreakpoint: (breakpoint: 'sm' | 'md' | 'lg' | 'xl') => boolean;
}

// Breakpoint type
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

// Hook return interface
export interface UseAdaptiveReturn {
  screen: ScreenUtils;
  scale: ScaleUtils;
  spacing: SpacingSystem;
  typography: TypographySystem;
  borderRadius: BorderRadiusSystem;
  presets: PresetSystems;
  
  // Convenience shortcuts
  /** Scale width shorthand */
  s: (size: number) => number;
  /** Scale font shorthand */
  sf: (size: number) => number;
  /** Scale pixel shorthand */
  sp: (pixels: number) => number;
  /** Scale custom multiplier shorthand */
  sc: (multiplier: number) => number;
  /** Width percentage shorthand */
  wp: (percent: number) => number;
  /** Height percentage shorthand */
  hp: (percent: number) => number;
}

// Main adaptive interface
export interface AdaptiveInterface {
  screen: ScreenUtils;
  scale: ScaleUtils;
  spacing: SpacingSystem;
  typography: TypographySystem;
  borderRadius: BorderRadiusSystem;
  presets: PresetSystems;
  utils: UtilityFunctions;
  
  /** Initialize with custom configuration */
  init: (config?: AdaptiveConfigPartial) => void;
  
  // Convenience shortcuts
  s: (size: number) => number;
  sf: (size: number) => number;
  sp: (pixels: number) => number;
  sc: (multiplier: number) => number;
  wp: (percent: number) => number;
  hp: (percent: number) => number;
}

// Dimension change event type
export interface DimensionChangeEvent {
  window: ScaledSize;
  screen: ScaledSize;
}

// Error types for validation
export class AdaptiveError extends Error {
  constructor(message: string) {
    super(`[react-native-adaptive]: ${message}`);
    this.name = 'AdaptiveError';
  }
}

export class AdaptiveConfigError extends AdaptiveError {
  constructor(message: string) {
    super(`Configuration Error: ${message}`);
    this.name = 'AdaptiveConfigError';
  }
}

export class AdaptiveValidationError extends AdaptiveError {
  constructor(message: string) {
    super(`Validation Error: ${message}`);
    this.name = 'AdaptiveValidationError';
  }
}

// Export function types
export type InitAdaptiveFunction = (config?: AdaptiveConfigPartial) => void;
export type UseAdaptiveHook = () => UseAdaptiveReturn;
export type ScaleFunction = (size: number) => number;
export type PercentFunction = (percent: number) => number;

// Default export type
declare const Adaptive: AdaptiveInterface;
export default Adaptive;