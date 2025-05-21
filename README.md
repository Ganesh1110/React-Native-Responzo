# React Native Responzo 📱✨

### The Ultimate Responsive Design Toolkit for React Native

[![npm version](https://img.shields.io/npm/v/react-native-responzo?color=61dafb&logo=npm)](https://npmjs.com/package/react-native-responzo)  
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)  
[![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-lightgrey)]()  
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-native-responzo?label=size)]()

<!-- ![Responzo Hero Banner](./screenshots/banner.png)
*(Example screenshot showing responsive layouts across devices)* -->

---

## 🌟 Why Choose Responzo?

Responzo takes the pain out of creating responsive React Native apps by providing:

- **Universal Screen Adaptation** – Perfect layouts on any device
- **Intelligent Font Scaling** – Readable text on all screens
- **Device-Specific Awareness** – Automatic notch and tablet handling
- **Performance Optimized** – Lightweight with zero unnecessary dependencies

---

## 🚀 Installation

```bash
# Using npm
npm install react-native-responzo react-native-device-info

# Using Yarn
yarn add react-native-responzo react-native-device-info
```

### 🔗 Peer Dependencies

| Package                  | Version   |
| ------------------------ | --------- |
| react-native             | >= 0.60.0 |
| react-native-device-info | >= 10.0.0 |

---

## 🔥 Features

### 1. Smart Dimension Scaling

```js
import { widthPercent, heightPercent } from "react-native-responzo";

const buttonWidth = widthPercent(10); // 10% of screen width
const cardHeight = heightPercent(15); // 15% of screen height (excluding status bar)
```

### 2. Adaptive Font Sizing

```js
import { scaledFontSize } from "react-native-responzo";

const headingSize = scaledFontSize(24); // Based on device height
const bodySize = scaledFontSize(16);
```

### 3. Device Intelligence

```js
import { isTablet, hasNotch, statusBarHeight } from "react-native-responzo";

console.log(`Is tablet: ${isTablet}`);
console.log(`Has notch: ${hasNotch}`);
console.log(`Status bar height: ${statusBarHeight}px`);
```

---

## 📚 Complete API Reference

### Core Functions

| Function         | Parameters                                   | Returns | Description                                      |
| ---------------- | -------------------------------------------- | ------- | ------------------------------------------------ |
| `widthPercent`   | percent: number (0–100)                      | number  | Converts % to pixel width                        |
| `heightPercent`  | percent: number (0–100)                      | number  | Converts % to pixel height (excludes status bar) |
| `moderateWidth`  | size: number, factor?: number (default: 0.5) | number  | Scales width with a smoothing factor             |
| `scaledFontSize` | size: number, baseHeight?: number (812)      | number  | Scales font size to screen height                |

### Device Properties

| Property          | Type    | Description                                |
| ----------------- | ------- | ------------------------------------------ |
| `isTablet`        | boolean | True if device is a tablet                 |
| `hasNotch`        | boolean | True if device has notch or Dynamic Island |
| `statusBarHeight` | number  | Status bar height in pixels                |
| `deviceWidth`     | number  | Screen width in pixels (portrait)          |
| `deviceHeight`    | number  | Screen height in pixels (portrait)         |
| `pixelDensity`    | number  | Device pixel ratio                         |

---

## 🎨 Usage Examples

### Responsive Card Component

```js
import Responsive from "react-native-responzo";

const Card = () => (
  <View
    style={{
      width: Responsive.widthPercent(90),
      height: Responsive.heightPercent(25),
      padding: Responsive.moderateWidth(15),
      marginVertical: Responsive.heightPercent(2),
    }}
  >
    <Text style={{ fontSize: Responsive.scaledFontSize(18) }}>
      This card looks great on all devices!
    </Text>
  </View>
);
```

### Device-Specific Layout

```js
import { isTablet, widthPercent } from "react-native-responzo";

const columns = isTablet ? 3 : 2;
const itemWidth = widthPercent(isTablet ? 30 : 45);
```

---

## 📊 Comparison with Alternatives

| Feature          | Responzo ✅      | react-native-responsive-screen | react-native-size-matters |
| ---------------- | ---------------- | ------------------------------ | ------------------------- |
| Notch Detection  | ✅ Yes           | ❌ No                          | ❌ No                     |
| Tablet Detection | ✅ Yes           | ❌ No                          | ❌ No                     |
| Font Scaling     | ✅ Smart scaling | ✅ Basic scaling               | ✅ Basic scaling          |
| Performance      | ⚡ Lightweight   | ⚡ Lightweight                 | ⚡ Lightweight            |
| Maintenance      | 🆕 Active        | 🕒 Less active                 | 🕒 Less active            |

---

## ❓ FAQ

**Q: How does Responzo handle orientation changes?**  
A: All dimensions are recalculated dynamically when orientation changes.

**Q: Can I use custom base dimensions?**  
A: Yes! Functions like `scaledFontSize` accept optional `baseHeight` params.

**Q: Is TypeScript supported?**  
A: Absolutely. Full TypeScript definitions are included.

---

## 🤝 Contributing

We welcome contributions! Please see our `CONTRIBUTING.md` for details.

---

## 📜 License

MIT © Ganesh Jayaprakash
