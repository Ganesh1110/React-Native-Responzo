# React Native Responzo 📱

<div align="center">

**The Ultimate Responsive Design Toolkit for React Native**

[![npm version](https://img.shields.io/npm/v/@ganesh1011/react-native-responzo?color=61dafb&logo=npm&logoColor=white)](https://www.npmjs.com/package/@ganesh1011/react-native-responzo)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-supported-yellow)]()
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@ganesh1011/react-native-responzo?label=size&color=success)](https://bundlephobia.com/package/@ganesh1011/react-native-responzo)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/ganesh1011/react-native-responzo)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/ganesh1011/react-native-responzo)
[![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen)](https://github.com/ganesh1011/react-native-responzo)

</div>

---

## 🎯 Features

- 🔥 **Zero Config** - Works out of the box with sensible defaults
- 📱 **Universal Compatibility** - Perfect layouts across all devices
- 🧠 **Smart Scaling** - Intelligent font and dimension scaling
- 🎨 **Device Awareness** - Automatic notch, Dynamic Island, and tablet detection
- ⚡ **Performance First** - Lightweight with minimal overhead
- 🔧 **Developer Friendly** - Rich TypeScript support and intuitive API
- 📐 **Pixel Perfect** - Precise percentage-based and scaled sizing

## 📦 Installation

```bash
# Using npm
npm install @ganesh1011/react-native-responzo react-native-device-info

# Using Yarn
yarn add @ganesh1011/react-native-responzo react-native-device-info

# Using pnpm
pnpm add @ganesh1011/react-native-responzo react-native-device-info
```

### iOS Setup

```bash
cd ios && pod install
```

## 🚀 Quick Start

```javascript
import {
  widthPercent,
  heightPercent,
  scaledFontSize,
  scaleWidth,
  isTablet,
} from "@ganesh1011/react-native-responzo";

const styles = StyleSheet.create({
  container: {
    width: widthPercent(90), // 90% of screen width
    height: heightPercent(50), // 50% of available height
    padding: scaleWidth(16), // Scaled padding
  },
  title: {
    fontSize: scaledFontSize(24), // Responsive font size
    marginBottom: isTablet() ? 20 : 12,
  },
});
```

## 📖 API Reference

### 📏 Dimension Functions

| Function                 | Parameters                   | Returns  | Description                             |
| ------------------------ | ---------------------------- | -------- | --------------------------------------- |
| `widthPercent(percent)`  | `percent: number (0-100)`    | `number` | Converts percentage to device width     |
| `heightPercent(percent)` | `percent: number (0-100)`    | `number` | Converts percentage to available height |
| `scaleWidth(size)`       | `size: number, factor?: 0.5` | `number` | Scales width with moderation factor     |
| `scaleHeight(size)`      | `size: number`               | `number` | Scales height proportionally            |

### 🔤 Typography Functions

| Function                   | Parameters                           | Returns  | Description                        |
| -------------------------- | ------------------------------------ | -------- | ---------------------------------- |
| `scaledFontSize(fontSize)` | `fontSize: number, baseHeight?: 812` | `number` | Smart font scaling for all devices |
| `scaleFont(fontSize)`      | `fontSize: number`                   | `number` | Alias for scaledFontSize           |

### 📱 Device Properties

| Property            | Type      | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `deviceWidth()`     | `number`  | Current device width (portrait-safe)  |
| `deviceHeight()`    | `number`  | Current device height (portrait-safe) |
| `isTablet()`        | `boolean` | Detects if device is a tablet         |
| `hasNotch()`        | `boolean` | Detects notch or Dynamic Island       |
| `statusBarHeight()` | `number`  | Platform-specific status bar height   |
| `availableHeight()` | `number`  | Screen height minus status bar        |
| `pixelDensity()`    | `number`  | Device pixel ratio                    |

## 🎨 Usage Examples

### Basic Responsive Layout

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercent,
  heightPercent,
  scaledFontSize,
  scaleWidth,
} from "@ganesh1011/react-native-responzo";

const ResponsiveCard = () => (
  <View style={styles.card}>
    <Text style={styles.title}>Responsive Card</Text>
    <Text style={styles.description}>
      This card adapts perfectly to any screen size
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: widthPercent(90),
    minHeight: heightPercent(25),
    padding: scaleWidth(20),
    backgroundColor: "#fff",
    borderRadius: scaleWidth(12),
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(8),
  },
  title: {
    fontSize: scaledFontSize(20),
    fontWeight: "600",
    marginBottom: scaleWidth(8),
  },
  description: {
    fontSize: scaledFontSize(14),
    color: "#666",
    lineHeight: scaledFontSize(20),
  },
});
```

### Device-Specific Adaptations

```javascript
import {
  isTablet,
  hasNotch,
  statusBarHeight,
} from "@ganesh1011/react-native-responzo";

const AdaptiveHeader = () => {
  const headerPadding = {
    paddingTop: statusBarHeight() + (hasNotch() ? 20 : 10),
    paddingHorizontal: isTablet() ? 40 : 20,
  };

  return (
    <View style={[styles.header, headerPadding]}>
      <Text style={styles.headerTitle}>
        {isTablet() ? "Tablet View" : "Mobile View"}
      </Text>
    </View>
  );
};
```

### Advanced Grid Layout

```javascript
import {
  widthPercent,
  isTablet,
  scaleWidth,
} from "@ganesh1011/react-native-responzo";

const ResponsiveGrid = ({ data }) => {
  const columns = isTablet() ? 3 : 2;
  const itemWidth = widthPercent((100 - (columns + 1) * 2) / columns);
  const spacing = scaleWidth(8);

  return (
    <View style={styles.grid}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.gridItem,
            {
              width: itemWidth,
              marginLeft: index % columns === 0 ? 0 : spacing,
              marginBottom: spacing,
            },
          ]}
        >
          {/* Grid item content */}
        </View>
      ))}
    </View>
  );
};
```

## 🔄 Import Options

### Named Imports (Recommended)

```javascript
import {
  widthPercent,
  heightPercent,
  scaledFontSize,
  isTablet,
} from "@ganesh1011/react-native-responzo";
```

### Default Import

```javascript
import Responsive from "@ganesh1011/react-native-responzo";

const { widthPercent, heightPercent } = Responsive;
// Or use directly: Responsive.widthPercent(50)
```

### Short Aliases

```javascript
import {
  scaleWidth as sw,
  scaleHeight as sh,
  scaleFont as sf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@ganesh1011/react-native-responzo";

const styles = {
  width: sw(100), // scaleWidth
  height: sh(50), // scaleHeight
  fontSize: sf(16), // scaleFont
  padding: wp(5), // widthPercent
  margin: hp(2), // heightPercent
};
```

## ⚖️ Comparison with Alternatives

### vs react-native-super-grid

| Feature                    | React Native Responzo               | react-native-super-grid         |
| -------------------------- | ----------------------------------- | ------------------------------- |
| **Purpose**                | Complete responsive toolkit         | Grid layouts only               |
| **Bundle Size**            | ~15KB minified                      | ~25KB minified                  |
| **Device Detection**       | ✅ Built-in tablet, notch detection | ❌ No device awareness          |
| **Font Scaling**           | ✅ Smart scaling with base heights  | ❌ Manual implementation needed |
| **TypeScript Support**     | ✅ Full TypeScript definitions      | ⚠️ Limited type support         |
| **Zero Config**            | ✅ Works out of the box             | ❌ Requires configuration       |
| **Custom Scaling Factors** | ✅ Adjustable moderation factors    | ❌ Fixed calculations           |

### vs react-native-size-matters

| Feature                     | React Native Responzo        | react-native-size-matters        |
| --------------------------- | ---------------------------- | -------------------------------- |
| **Modern React Native**     | ✅ Supports RN 0.70+         | ⚠️ Limited newer version support |
| **Device Info Integration** | ✅ Built-in device detection | ❌ Manual device handling        |
| **API Simplicity**          | ✅ Intuitive function names  | ⚠️ Complex naming convention     |
| **Maintenance**             | ✅ Actively maintained       | ⚠️ Irregular updates             |
| **Performance**             | ✅ Optimized calculations    | ⚠️ Some redundant calculations   |
| **Documentation**           | ✅ Comprehensive examples    | ⚠️ Basic documentation           |

### vs Manual Dimensions API

| Approach                | React Native Responzo    | Manual Dimensions              |
| ----------------------- | ------------------------ | ------------------------------ |
| **Development Time**    | ⚡ Instant setup         | 🐌 Custom implementation       |
| **Code Maintenance**    | ✅ Single dependency     | ❌ Scattered responsive logic  |
| **Device Handling**     | ✅ Automatic adaptation  | ❌ Manual device detection     |
| **Orientation Changes** | ✅ Handled automatically | ❌ Custom event listeners      |
| **Cross-platform**      | ✅ iOS/Android optimized | ⚠️ Platform-specific tweaks    |
| **Error Prone**         | ✅ Tested and reliable   | ❌ Prone to calculation errors |

### vs Styled-components + Manual Scaling

| Feature                | React Native Responzo   | Styled Components Approach     |
| ---------------------- | ----------------------- | ------------------------------ |
| **Learning Curve**     | ✅ Simple functions     | ⚠️ CSS-in-JS paradigm          |
| **Performance**        | ✅ Direct calculations  | ⚠️ Runtime style processing    |
| **Bundle Impact**      | ✅ Minimal footprint    | ❌ Larger bundle size          |
| **React Native Focus** | ✅ Built for RN         | ⚠️ General web/mobile solution |
| **Theme Integration**  | ✅ Easy theme support   | ✅ Strong theme system         |
| **Debugging**          | ✅ Clear function calls | ⚠️ Generated class names       |

### Why Choose React Native Responzo?

**🎯 Best for projects that need:**

- Quick responsive implementation without configuration
- Consistent scaling across diverse device sizes
- Built-in device type detection and adaptation
- Minimal bundle size impact
- Strong TypeScript support
- Active maintenance and community support

**⚠️ Consider alternatives if:**

- You need complex grid-specific features (use react-native-super-grid)
- Your project heavily uses styled-components ecosystem
- You require web platform support (Responzo is mobile-focused)
- You prefer writing custom responsive logic

## 🎯 Best Practices

### ✅ Do's

- Use percentage-based sizing for layouts
- Combine with device detection for optimal UX
- Test on various screen sizes and orientations
- Use font scaling for better accessibility

```javascript
// ✅ Good - Responsive and accessible
const styles = StyleSheet.create({
  container: {
    width: widthPercent(90),
    padding: scaleWidth(16),
  },
  text: {
    fontSize: scaledFontSize(16),
    lineHeight: scaledFontSize(24),
  },
});
```

### ❌ Don'ts

- Don't mix responsive and fixed values inconsistently
- Avoid extreme percentages (>95% or <5%)
- Don't ignore device-specific considerations

```javascript
// ❌ Avoid - Inconsistent sizing
const styles = StyleSheet.create({
  container: {
    width: 350, // Fixed width
    padding: scaleWidth(16), // Responsive padding
  },
});
```

## 🔧 Advanced Configuration

### Custom Scaling Factors

```javascript
import { moderateWidth } from "@ganesh1011/react-native-responzo";

// Default factor: 0.5 (moderate scaling)
const normalScaling = moderateWidth(20);

// Custom factor: 0.2 (subtle scaling)
const subtleScaling = moderateWidth(20, 0.2);

// Custom factor: 0.8 (aggressive scaling)
const aggressiveScaling = moderateWidth(20, 0.8);
```

### Dynamic Orientation Handling

```javascript
import { Dimensions } from "react-native";
import { widthPercent, heightPercent } from "@ganesh1011/react-native-responzo";

const [orientation, setOrientation] = useState("portrait");

useEffect(() => {
  const subscription = Dimensions.addEventListener("change", ({ window }) => {
    setOrientation(window.width > window.height ? "landscape" : "portrait");
  });

  return () => subscription?.remove();
}, []);

const styles = StyleSheet.create({
  container: {
    flexDirection: orientation === "landscape" ? "row" : "column",
    width: widthPercent(95),
    height: heightPercent(orientation === "landscape" ? 80 : 70),
  },
});
```

## 🐛 Troubleshooting

<details>
<summary><strong>Import/Export Issues</strong></summary>

If you encounter import errors, try these solutions:

```javascript
// Method 1: Check available exports
import Responzo from '@ganesh1011/react-native-responzo';
console.log('Available functions:', Object.keys(Responzo));

// Method 2: Use default import
import Responsive from '@ganesh1011/react-native-responzo';
const { widthPercent } = Responsive;

// Method 3: Clear cache and reinstall
npm start -- --reset-cache
```

</details>

<details>
<summary><strong>Device Info Issues</strong></summary>

Ensure react-native-device-info is properly installed:

```bash
# Reinstall dependencies
npm uninstall react-native-device-info
npm install react-native-device-info

# iOS: Re-run pod install
cd ios && pod install && cd ..

# Android: Clean and rebuild
npx react-native run-android --reset-cache
```

</details>

<details>
<summary><strong>TypeScript Errors</strong></summary>

```bash
# Install type definitions
npm install --save-dev @types/react-native-device-info

# Or add to tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

</details>

## 📊 Compatibility

| React Native | Status             |
| ------------ | ------------------ |
| 0.70+        | ✅ Fully Supported |
| 0.65 - 0.69  | ✅ Compatible      |
| 0.60 - 0.64  | ⚠️ Limited Support |
| < 0.60       | ❌ Not Supported   |

| Platform | Status             |
| -------- | ------------------ |
| iOS      | ✅ Full Support    |
| Android  | ✅ Full Support    |
| Web      | ⚠️ Partial Support |

<!-- ## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details. -->

### Development Setup

```bash
git clone https://github.com/ganesh1011/react-native-responzo.git
cd react-native-responzo
npm install
npm run test
npm run build
```

## 📞 Contact & Support

- **Email**: [ganeshjayaprakash3@gmail.com](mailto:ganeshjayaprakash3@gmail.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/Ganesh1110/React-Native-Responzo/issues)
- **Discussions**: [Join our community discussions](https://github.com/Ganesh1110/React-Native-Responzo/discussions)

## 📄 License

MIT © 2023 Ganesh Jayaprakash  
See the [LICENSE](./LICENSE) file for full details.

## 🙏 Acknowledgments

- Built with ❤️ for the React Native community
- Special thanks to all contributors and users

<div align="center">

**[⭐ Star us on GitHub](https://github.com/ganesh1011/react-native-responzo)** • **[📦 npm Package](https://www.npmjs.com/package/@ganesh1011/react-native-responzo)** • **[🐛 Report Issues](https://github.com/ganesh1011/react-native-responzo/issues)**

Made with 💙 by [Ganesh Jayaprakash](https://github.com/ganesh1011)

</div>
