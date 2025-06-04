# React Native Responzo 🎯

<div align="center">

**The Ultimate Adaptive Design System for React Native**

[![npm version](https://img.shields.io/npm/v/react-native-responzo?color=61dafb&logo=npm&logoColor=white)](https://www.npmjs.com/package/@ganesh1011/react-native-responzo)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-supported-yellow)]()
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-native-responzo?label=size&color=success)](https://bundlephobia.com/package/react-native-responzo)
[![SSR Safe](https://img.shields.io/badge/SSR-safe-green)]()

</div>

---

## 🎯 Features

- 🚀 **Zero Config** - Works out of the box with intelligent defaults
- 📱 **Universal Compatibility** - Perfect scaling across all devices
- 🧠 **Intelligent Scaling** - Advanced scaling algorithms with customizable factors
- 📏 **Complete Design System** - Typography, spacing, and border radius utilities
- 🔄 **Orientation Aware** - Real-time orientation change detection
- 🏗️ **SSR Safe** - Server-side rendering compatible
- ⚡ **Performance First** - Optimized calculations with minimal overhead
- 🎨 **TypeScript Native** - Built with TypeScript for maximum type safety
- 🔧 **Highly Configurable** - Customize base dimensions, scaling factors, and more

## 📦 Installation

```bash
# Using npm
npm install react-native-responzo react-native-device-info

# Using Yarn
yarn add react-native-responzo react-native-device-info

# Using pnpm
pnpm add react-native-responzo react-native-device-info
```

### iOS Setup

```bash
cd ios && pod install
```

## 🚀 Quick Start

```typescript
import Adaptive, {
  scale,
  spacing,
  typography,
  borderRadius,
  useAdaptive,
} from "react-native-responzo";

const styles = StyleSheet.create({
  container: {
    width: scale.widthPercent(90),
    height: scale.heightPercent(50),
    padding: spacing.md, // 16 (scaled)
    borderRadius: borderRadius.lg,
  },
  title: {
    fontSize: typography.xl, // Smart font scaling
    marginBottom: spacing.sm,
  },
});
```

## 🔍 Example Code

To see a complete implementation showcasing all features, check out our:

[✨ **Example Showcase** ✨](https://github.com/Ganesh1110/React-Native-Responzo/blob/main/example/ResponzoShowcase.js) _(click to view code)_

## 🎛️ Configuration

### Initialize with Custom Config

```typescript
import { initAdaptive } from "react-native-responzo";

// Initialize once in your app's entry point
initAdaptive({
  baseWidth: 414, // iPhone 11 Pro width
  baseHeight: 896, // iPhone 11 Pro height
  scalingFactor: 0.3, // More subtle scaling
  tabletBreakpoint: 800, // Custom tablet detection
  spacingBase: 8, // 8px base spacing unit
});
```

## 📖 API Reference

### 📏 Screen Utilities

```typescript
import { screen } from "react-native-responzo";

// Access current dimensions
const currentWidth = screen.width;
const currentHeight = screen.height;

// Device type detection
const isTabletDevice = screen.isTablet;
const devicePixelRatio = screen.pixelRatio;

// Orientation detection
const isLandscapeMode = screen.isLandscape;
const isPortraitMode = screen.isPortrait;
```

### 🔧 Scaling Functions

```typescript
import { scale } from "react-native-responzo";

// Dimensional scaling
const scaledWidth = scale.width(100); // Intelligent width scaling
const scaledHeight = scale.height(50); // Proportional height scaling
const responsiveFont = scale.font(16); // Smart font scaling with tablet adjustment

// Percentage-based scaling
const halfScreen = scale.widthPercent(50); // 50% of screen width
const quarterHeight = scale.heightPercent(25); // 25% of screen height
```

### 📐 Spacing System

```typescript
import { spacing } from "react-native-responzo";

// Predefined spacing values (scaled automatically)
spacing.xs; // 4px  (scaled)
spacing.sm; // 8px  (scaled)
spacing.md; // 16px (scaled)
spacing.lg; // 24px (scaled)
spacing.xl; // 32px (scaled)
spacing.xxl; // 48px (scaled)

// Custom spacing
spacing.custom(3); // 3 × base spacing unit (12px scaled)
spacing.px(20); // Direct pixel scaling
spacing.percent(15); // 15% of screen width
```

### 🔤 Typography System

```typescript
import { typography } from "react-native-responzo";

// Predefined font sizes (with tablet adjustments)
typography.xs; // 12px (scaled, +2 on tablets)
typography.sm; // 14px (scaled, +2 on tablets)
typography.base; // 16px (scaled, +2 on tablets)
typography.lg; // 18px (scaled, +2 on tablets)
typography.xl; // 20px (scaled, +2 on tablets)
typography.xxl; // 24px (scaled, +2 on tablets)
typography.xxxl; // 32px (scaled, +2 on tablets)

// Custom font scaling
typography.custom(22); // Custom size with smart scaling
```

### 🎨 Border Radius System

```typescript
import { borderRadius } from "react-native-responzo";

borderRadius.none; // 0
borderRadius.sm; // 4px  (scaled)
borderRadius.base; // 8px  (scaled)
borderRadius.md; // 12px (scaled)
borderRadius.lg; // 16px (scaled)
borderRadius.xl; // 24px (scaled)
borderRadius.full; // 9999 (pill shape)

// Custom border radius
borderRadius.custom(18); // Custom radius with scaling
```

## 🔄 React Hook Integration

### useAdaptive Hook

```typescript
import React from "react";
import { View, Text } from "react-native";
import { useAdaptive } from "react-native-responzo";

const App = () => {
  const ResponsiveComponent = () => {
    const { screen, scale, spacing, typography, orientation } = useAdaptive();

    return (
      <View
        style={{
          width: scale.widthPercent(orientation.isLandscape ? 60 : 90),
          padding: spacing.md,
          fontSize: typography.lg,
        }}
      >
        <Text>
          Current orientation:{" "}
          {orientation.isLandscape ? "Landscape" : "Portrait"}
        </Text>
        <Text>Aspect ratio: {orientation.aspectRatio.toFixed(2)}</Text>
        <Text>
          Screen: {screen.width} × {screen.height}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ResponsiveComponent />
    </View>
  );
};

export default App;
```

## 🛠️ Utility Functions

### Spacing Utilities

```typescript
import { utils } from "react-native-responzo";

// Create consistent padding
const paddingStyles = utils.createSpacing(16, 12, 16, 12); // top, right, bottom, left
// Returns: { paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12 } (all scaled)

// Create margin spacing
const marginStyles = utils.createMargin(8, 0, 16, 0);
// Returns: { marginTop: 8, marginRight: 0, marginBottom: 16, marginLeft: 0 } (all scaled)

// Shorthand spacing
const shortPadding = utils.createPadding(12, 20); // vertical, horizontal
// Returns: { paddingVertical: 12, paddingHorizontal: 20 } (scaled)

const shortMargin = utils.createMarginShorthand(8, 16);
// Returns: { marginVertical: 8, marginHorizontal: 16 } (scaled)
```

### Responsive Breakpoints

```typescript
// Check responsive breakpoints
const isSmallScreen = utils.isBreakpoint("sm"); // >= 480px
const isMediumScreen = utils.isBreakpoint("md"); // >= 768px
const isLargeScreen = utils.isBreakpoint("lg"); // >= 1024px
const isXLargeScreen = utils.isBreakpoint("xl"); // >= 1280px
```

### Orientation Utilities

```typescript
// Get orientation-based styles
const orientationStyles = utils.getOrientationStyles();
// Returns: { container: { width, height, flexDirection: 'row' | 'column' } }

// SSR safety check
const isServerSide = utils.isSSR();
```

## 🎨 Usage Examples

### Basic Responsive Card

```typescript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  scale,
  spacing,
  typography,
  borderRadius,
} from "react-native-responzo";

const ResponsiveCard = ({ title, description }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: scale.widthPercent(90),
    minHeight: scale.heightPercent(25),
    padding: spacing.lg,
    backgroundColor: "#ffffff",
    borderRadius: borderRadius.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scale.height(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: borderRadius.sm,
    elevation: 3,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.base,
    color: "#666666",
    lineHeight: typography.lg,
  },
});

export default ResponsiveCard;
```

### Advanced Layout with Device Detection

```typescript
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  screen,
  scale,
  spacing,
  typography,
  utils,
  borderRadius,
} from "react-native-responzo";

const AdaptiveLayout = () => {
  const isTablet = screen.isTablet;
  const isLandscape = screen.isLandscape;

  const containerPadding = utils.createPadding(
    isTablet ? 32 : 16, // vertical
    isTablet ? 40 : 20 // horizontal
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, containerPadding]}>
        <Text style={styles.title}>
          {isTablet ? "Tablet Experience" : "Mobile Experience"}
        </Text>

        <View
          style={[
            styles.grid,
            { flexDirection: isLandscape ? "row" : "column" },
          ]}
        >
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              style={[
                styles.gridItem,
                {
                  width: isLandscape
                    ? scale.widthPercent(30)
                    : scale.widthPercent(90),
                  marginBottom: isLandscape ? 0 : spacing.md,
                  marginRight: isLandscape ? spacing.md : 0,
                },
              ]}
            >
              <Text style={styles.itemText}>Item {item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.info}>
          Screen: {screen.width} × {screen.height}
          {"\n"}Device: {isTablet ? "Tablet" : "Phone"}
          {"\n"}Orientation: {isLandscape ? "Landscape" : "Portrait"}
          {"\n"}Pixel Ratio: {screen.pixelRatio}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  grid: {
    marginBottom: spacing.xl,
  },
  gridItem: {
    backgroundColor: "#ffffff",
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scale.height(1),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale.width(2),
    elevation: 2,
  },
  itemText: {
    fontSize: typography.base,
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
  },
  info: {
    fontSize: typography.sm,
    color: "#666666",
    backgroundColor: "#e8e8e8",
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    fontFamily: "monospace",
  },
});

export default AdaptiveLayout;
```

### Dynamic Form with Responsive Inputs

```typescript
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  borderRadius,
  spacing,
  typography,
  useAdaptive,
  utils,
} from "react-native-responzo";

const ResponsiveForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { screen, scale, spacing, typography, borderRadius, orientation } =
    useAdaptive();

  const isSmallScreen = utils.isBreakpoint("sm");
  const formWidth =
    orientation.isLandscape && screen.isTablet
      ? scale.widthPercent(60)
      : scale.widthPercent(90);

  return (
    <View style={styles.container}>
      <View style={[styles.form, { width: formWidth }]}>
        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { fontSize: isSmallScreen ? typography.sm : typography.base },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              { fontSize: isSmallScreen ? typography.sm : typography.base },
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { marginTop: screen.isTablet ? spacing.xl : spacing.lg },
          ]}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {screen.isTablet && (
          <Text style={styles.tabletHint}>Optimized for tablet experience</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    ...utils.createPadding(20, 16),
  },
  form: {
    backgroundColor: "#ffffff",
    ...utils.createPadding(32, 24),
    borderRadius: borderRadius.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.base,
    fontWeight: "500",
    color: "#374151",
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: borderRadius.sm,
    ...utils.createPadding(12, 16),
    backgroundColor: "#f9fafb",
    fontSize: typography.base,
    color: "#1a1a1a",
  },
  button: {
    backgroundColor: "#3b82f6",
    ...utils.createPadding(16, 24),
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: typography.lg,
    fontWeight: "600",
  },
  tabletHint: {
    fontSize: typography.sm,
    color: "#6b7280",
    textAlign: "center",
    marginTop: spacing.md,
    fontStyle: "italic",
  },
});

export default ResponsiveForm;
```

### Complex Grid System

```typescript
import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import {
  screen,
  scale,
  spacing,
  typography,
  borderRadius,
} from "react-native-responzo";

const ResponsiveGrid = ({ data = [] }) => {
  // Get current screen dimensions
  const screenData = Dimensions.get("window");
  const screenWidth = screenData.width;
  const screenHeight = screenData.height;
  const isLandscape = screenWidth > screenHeight;

  // Dynamic column calculation based on device and orientation
  const getColumns = () => {
    if (screen.isTablet) {
      return isLandscape ? 4 : 3;
    }
    return isLandscape ? 3 : 2;
  };

  const columns = getColumns();
  const itemSpacing = spacing.sm || 8;
  const containerPadding = spacing.md || 16;

  // Calculate item width with proper spacing
  const totalHorizontalSpacing =
    containerPadding * 2 + (columns - 1) * itemSpacing;
  const availableWidth = screenWidth - totalHorizontalSpacing;
  const itemWidth = Math.floor(availableWidth / columns);

  // Create rows for better layout control
  const createRows = () => {
    const rows = [];
    for (let i = 0; i < data.length; i += columns) {
      rows.push(data.slice(i, i + columns));
    }
    return rows;
  };

  const renderGridItem = (item, index, rowIndex) => {
    const isLastInRow = index === columns - 1;

    return (
      <View
        key={item.id || `${rowIndex}-${index}`}
        style={[
          styles.gridItem,
          {
            width: itemWidth,
            marginRight: isLastInRow ? 0 : itemSpacing,
          },
        ]}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>
            {item.title || `Item ${rowIndex * columns + index + 1}`}
          </Text>
          <Text style={styles.itemDescription}>
            {item.description ||
              "This is a responsive card that adapts to different screen sizes and orientations."}
          </Text>
        </View>
      </View>
    );
  };

  const renderRow = (rowData, rowIndex) => {
    return (
      <View key={rowIndex} style={styles.row}>
        {rowData.map((item, index) => renderGridItem(item, index, rowIndex))}
        {/* Fill empty spaces in incomplete rows */}
        {rowData.length < columns &&
          Array.from({ length: columns - rowData.length }).map(
            (_, emptyIndex) => (
              <View
                key={`empty-${rowIndex}-${emptyIndex}`}
                style={{
                  width: itemWidth,
                  marginRight:
                    emptyIndex === columns - rowData.length - 1
                      ? 0
                      : itemSpacing,
                }}
              />
            )
          )}
      </View>
    );
  };

  const rows = createRows();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.grid, { paddingHorizontal: containerPadding }]}>
        <Text style={styles.gridTitle}>Adaptive Grid ({columns} columns)</Text>
        <Text style={styles.gridSubtitle}>
          {screen.isTablet ? "Tablet" : "Phone"} •{" "}
          {isLandscape ? "Landscape" : "Portrait"}
        </Text>

        <View style={styles.gridContainer}>
          {rows.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  grid: {
    flex: 1,
    paddingTop: 20,
  },
  gridTitle: {
    fontSize: typography.xl || 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: spacing.xs || 4,
  },
  gridSubtitle: {
    fontSize: typography.sm || 14,
    color: "#6b7280",
    marginBottom: spacing.lg || 20,
  },
  gridContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: spacing.sm || 8,
    justifyContent: "flex-start",
  },
  gridItem: {
    backgroundColor: "#ffffff",
    borderRadius: borderRadius.md || 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    // Ensure minimum height for consistent appearance
    minHeight: 120,
  },
  itemContent: {
    padding: spacing.md || 16,
    flex: 1,
  },
  itemTitle: {
    fontSize: typography.base || 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: spacing.xs || 4,
  },
  itemDescription: {
    fontSize: typography.sm || 14,
    color: "#6b7280",
    lineHeight: typography.base || 20,
    flex: 1,
  },
});

// Usage example with sample data
const GridExample = () => {
  const sampleData = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    title: `Card ${index + 1}`,
    description: `This is a responsive card that adapts to different screen sizes and orientations.`,
  }));

  return <ResponsiveGrid data={sampleData} />;
};

export default GridExample;
```

## 🎯 Best Practices

### ✅ Recommended Patterns

```typescript
// ✅ Use the design system consistently
const styles = StyleSheet.create({
  container: {
    padding: spacing.lg, // Use spacing system
    borderRadius: borderRadius.md, // Use border radius system
  },
  text: {
    fontSize: typography.base, // Use typography system
    marginBottom: spacing.sm, // Consistent spacing
  },
});

// ✅ Combine with device detection
const adaptiveStyles = {
  fontSize: screen.isTablet ? typography.lg : typography.base,
  padding: screen.isTablet ? spacing.xl : spacing.lg,
};

// ✅ Use percentage-based layouts
const responsiveWidth = scale.widthPercent(screen.isLandscape ? 60 : 90);
```

### ❌ Anti-patterns to Avoid

```typescript
// ❌ Don't mix fixed and scaled values inconsistently
const badStyles = {
  width: 200, // Fixed width
  padding: spacing.md, // Scaled padding
  fontSize: 16, // Fixed font size
  marginTop: scale.height(10), // Scaled margin
};

// ❌ Don't ignore device capabilities
const poorUX = {
  width: scale.widthPercent(100), // Too wide, no margins
  fontSize: typography.xs, // Too small for accessibility
};
```

## 🔧 Advanced Configuration Examples

### Custom Design System

```typescript
import { initAdaptive } from "react-native-responzo";

// Create a custom config for your design system
initAdaptive({
  baseWidth: 390, // iPhone 12 Pro width
  baseHeight: 844, // iPhone 12 Pro height
  scalingFactor: 0.25, // Very subtle scaling
  tabletBreakpoint: 768, // iPad Mini width
  spacingBase: 4, // 4px base unit (Tailwind-like)
});

// Now all scaling functions use your custom config
```

### Theme Integration

```typescript
// Create a theme that works with the adaptive system
export const theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    textSecondary: "#64748b",
  },
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  },
  typography: {
    h1: { fontSize: typography.xxxl, fontWeight: "bold" },
    h2: { fontSize: typography.xxl, fontWeight: "600" },
    h3: { fontSize: typography.xl, fontWeight: "600" },
    body: { fontSize: typography.base, lineHeight: typography.lg },
    caption: { fontSize: typography.sm, color: "#64748b" },
  },
  borderRadius: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
  },
};
```

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>SSR/Next.js Compatibility</strong></summary>

The library is SSR-safe and provides fallback values:

```typescript
// Safe to use in SSR environments
import { screen, utils } from "react-native-responzo";

// Check if running in SSR
if (utils.isSSR()) {
  console.log("Running in SSR mode");
  // Fallback dimensions are used automatically
}
```

</details>

<details>
<summary><strong>Device Info Not Working</strong></summary>

Ensure react-native-device-info is properly installed:

```bash
# Reinstall dependencies
npm uninstall react-native-device-info
npm install react-native-device-info

# iOS: Re-run pod install
cd ios && pod install

# Android: Clean build
npx react-native run-android --reset-cache
```

</details>

<details>
<summary><strong>TypeScript Errors</strong></summary>

Make sure you have the correct import paths:

```typescript
// ✅ Correct imports
import Adaptive, { scale, spacing, typography } from "react-native-responzo";

// ❌ Incorrect - this won't work
import { scale } from "react-native-adaptive";
```

</details>

## 📊 Performance Considerations

The library is optimized for performance:

- **Lazy Evaluation**: Dimensions are calculated only when accessed
- **Memoized Calculations**: Repeated calculations are cached
- **Minimal Bundle Size**: Tree-shakeable exports
- **SSR Safe**: No runtime errors in server environments
- **Memory Efficient**: No unnecessary object creation

## 📊 Library Comparison

### vs react-native-size-matters

| Feature                  | react-native-responzo                             | react-native-size-matters       |
| ------------------------ | ------------------------------------------------- | ------------------------------- |
| **Bundle Size**          | 📦 ~1.5KB minified                                | 📦 ~18KB minified               |
| **TypeScript Support**   | ✅ Native TypeScript                              | ⚠️ Basic types only             |
| **Design System**        | ✅ Complete system (spacing, typography, borders) | ❌ Basic scaling only           |
| **SSR Safety**           | ✅ SSR compatible with fallbacks                  | ❌ Crashes in SSR               |
| **Device Detection**     | ✅ Built-in tablet/orientation detection          | ❌ Manual implementation needed |
| **Configuration**        | ✅ Highly configurable                            | ⚠️ Limited options              |
| **React Hooks**          | ✅ `useAdaptive()` with reactive updates          | ❌ No hooks provided            |
| **Orientation Handling** | ✅ Real-time orientation changes                  | ❌ Manual event listeners       |
| **Performance**          | ✅ Lazy evaluation + memoization                  | ⚠️ Recalculates on every call   |
| **Maintenance**          | ✅ Actively maintained                            | ⚠️ Irregular updates            |
| **Test Coverage**        | ✅ 100% test coverage                             | ⚠️ Limited test coverage        |

### vs react-native-super-grid

| Feature              | react-native-responzo          | react-native-super-grid        |
| -------------------- | ------------------------------ | ------------------------------ |
| **Purpose**          | 🎯 Complete responsive toolkit | 🎯 Grid layouts only           |
| **Flexibility**      | ✅ Any layout type             | ❌ Grid-specific only          |
| **Responsive Utils** | ✅ Full responsive utilities   | ❌ Limited responsive features |
| **Learning Curve**   | ✅ Simple, intuitive API       | ⚠️ Grid-specific concepts      |
| **Bundle Impact**    | ✅ Tree-shakeable exports      | ❌ Larger, monolithic          |
| **Custom Scaling**   | ✅ Advanced scaling algorithms | ❌ Basic dimension handling    |

### vs react-native-responsive-dimensions

| Feature                 | react-native-responzo                   | react-native-responsive-dimensions |
| ----------------------- | --------------------------------------- | ---------------------------------- |
| **API Completeness**    | ✅ Complete design system               | ❌ Basic percentage functions only |
| **Smart Scaling**       | ✅ Intelligent scaling with factors     | ❌ Simple percentage calculations  |
| **Device Awareness**    | ✅ Tablet, orientation, notch detection | ❌ No device detection             |
| **TypeScript**          | ✅ Full type definitions                | ⚠️ Basic types                     |
| **Modern React Native** | ✅ Supports latest RN versions          | ⚠️ Limited modern RN support       |
| **Configuration**       | ✅ Customizable base dimensions         | ❌ Fixed calculations              |

### vs Manual Dimensions API

| Approach                | react-native-responzo          | Manual Implementation               |
| ----------------------- | ------------------------------ | ----------------------------------- |
| **Development Speed**   | ⚡ Instant responsive layouts  | 🐌 Custom responsive logic          |
| **Consistency**         | ✅ Standardized design system  | ❌ Inconsistent scaling across team |
| **Maintenance**         | ✅ Single dependency to update | ❌ Scattered responsive code        |
| **Error Prone**         | ✅ Battle-tested algorithms    | ❌ Prone to calculation errors      |
| **Device Handling**     | ✅ Automatic device adaptation | ❌ Manual device detection          |
| **Orientation Changes** | ✅ Handled automatically       | ❌ Custom event listeners needed    |

## 📄 License

MIT © 2023 Ganesh Jayaprakash  
See the [LICENSE](./LICENSE) file for full details.

## 🙏 Acknowledgments

- Built with ❤️ for the React Native community
- Special thanks to all contributors and users

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/Ganesh1110/React-Native-Responzo)** • **[📦 npm Package](https://www.npmjs.com/package/react-native-responzo)** • **[🐛 Report Issues](https://github.com/Ganesh1110/React-Native-Responzo/issues)**

Made with 💙 by [Ganesh Jayaprakash](https://github.com/ganesh1011)

</div>
