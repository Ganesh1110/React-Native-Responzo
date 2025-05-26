# React Native Responzo 📱✨

### The Ultimate Responsive Design Toolkit for React Native

[![npm version](https://img.shields.io/npm/v/@ganesh1011/react-native-responzo?color=61dafb&logo=npm)](https://www.npmjs.com/package/@ganesh1011/react-native-responzo)  
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)  
[![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-lightgrey)]()  
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@ganesh1011/react-native-responzo?label=size)]()
[![Tests](https://img.shields.io/badge/tests-18%20passed%2F18-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-48.97%25-yellow)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-supported-yellow)]()

---

## 🌟 Why Choose Responzo?

Responzo takes the pain out of creating responsive React Native apps by providing:

- **Universal Screen Adaptation** – Perfect layouts on any device
- **Intelligent Font Scaling** – Readable text on all screens
- **Device-Specific Awareness** – Automatic notch and tablet handling
- **Performance Optimized** – Lightweight with zero unnecessary dependencies

---

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @ganesh1011/react-native-responzo react-native-device-info

# Using Yarn
yarn add @ganesh1011/react-native-responzo react-native-device-info

# Using pnpm
pnpm add @ganesh1011/react-native-responzo react-native-device-info
```

### iOS Additional Setup (for react-native-device-info)

```bash
cd ios && pod install
```

### Basic Usage

```javascript
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "@ganesh1011/react-native-responzo";

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90), // 90% of screen width
    height: responsiveHeight(50), // 50% of screen height
    padding: responsiveWidth(5), // 5% of screen width
  },
  title: {
    fontSize: responsiveFontSize(3), // Responsive font size
  },
});
```

---

## 📚 Complete API Reference

### Import Methods

```javascript
// Method 1: Named imports (Recommended)
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from "@ganesh1011/react-native-responzo";

// Method 2: Default import
import Responzo from "@ganesh1011/react-native-responzo";
const { responsiveWidth, responsiveHeight } = Responzo;

// Method 3: Namespace import
import * as Responzo from "@ganesh1011/react-native-responzo";
const width = Responzo.responsiveWidth(50);
```

### Core Responsive Functions

| Function                          | Parameters              | Returns | Description                                        |
| --------------------------------- | ----------------------- | ------- | -------------------------------------------------- |
| `responsiveWidth(percent)`        | percent: number (0-100) | number  | Returns width as percentage of screen width        |
| `responsiveHeight(percent)`       | percent: number (0-100) | number  | Returns height as percentage of screen height      |
| `responsiveFontSize(percent)`     | percent: number         | number  | Returns scaled font size based on screen size      |
| `responsiveScreenWidth(percent)`  | percent: number (0-100) | number  | Returns width as percentage of full screen width   |
| `responsiveScreenHeight(percent)` | percent: number (0-100) | number  | Returns height as percentage of full screen height |

### Legacy/Alternative Functions (if available)

| Function         | Parameters                                   | Returns | Description                          |
| ---------------- | -------------------------------------------- | ------- | ------------------------------------ |
| `widthPercent`   | percent: number (0–100)                      | number  | Alias for responsiveWidth            |
| `heightPercent`  | percent: number (0–100)                      | number  | Alias for responsiveHeight           |
| `moderateWidth`  | size: number, factor?: number (default: 0.5) | number  | Scales width with a smoothing factor |
| `scaledFontSize` | size: number, baseHeight?: number (812)      | number  | Scales font size to screen height    |

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

## 💡 Usage Examples

### 1. Responsive Login Screen

```javascript
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "@ganesh1011/react-native-responzo";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    justifyContent: "center",
  },
  title: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: responsiveHeight(4),
  },
  input: {
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
  },
  button: {
    height: responsiveHeight(6),
    backgroundColor: "#007AFF",
    borderRadius: responsiveWidth(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },
  buttonText: {
    color: "white",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
  },
});
```

### 2. Device-Specific Layout

```javascript
import { isTablet, responsiveWidth } from "@ganesh1011/react-native-responzo";

const ResponsiveGrid = () => {
  const columns = isTablet ? 3 : 2;
  const itemWidth = responsiveWidth(isTablet ? 30 : 45);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            width: itemWidth,
            margin: responsiveWidth(2.5),
          }}
        >
          {/* Item content */}
        </View>
      ))}
    </View>
  );
};
```

### 3. TypeScript Usage

```typescript
import { widthPercent, isTablet } from "react-native-responzo";

const responsiveButtonStyle = {
  width: widthPercent(80),
  padding: isTablet() ? 20 : 15, // Add () since isTablet is now a function
};
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "responsiveWidth is not a function" Error

```javascript
// ❌ Wrong - This might not work
import { responsiveWidth } from "@ganesh1011/react-native-responzo";

// ✅ Try these alternatives:
// Option 1: Default import
import Responzo from "@ganesh1011/react-native-responzo";
const { responsiveWidth } = Responzo;

// Option 2: Namespace import
import * as Responzo from "@ganesh1011/react-native-responzo";
const width = Responzo.responsiveWidth(50);

// Option 3: Check what's exported
import Responzo from "@ganesh1011/react-native-responzo";
console.log("Available functions:", Object.keys(Responzo));
```

#### 2. react-native-device-info Issues

Make sure you've installed the peer dependency:

```bash
npm install react-native-device-info
cd ios && pod install  # iOS only
```

#### 3. Metro bundler cache issues

```bash
# Clear Metro cache
npx react-native start --reset-cache

# Or
npm start -- --reset-cache
```

---

## 📊 Performance & Compatibility

### Supported React Native Versions

| React Native Version | Support Status   |
| -------------------- | ---------------- |
| 0.70+                | ✅ Full support  |
| 0.65 - 0.69          | ✅ Compatible    |
| 0.60 - 0.64          | ⚠️ Limited       |
| < 0.60               | ❌ Not supported |

### Bundle Size Impact

- **Package size**: ~15KB minified
- **Runtime impact**: Negligible
- **Dependencies**: Only react-native-device-info

---

## 🆚 Comparison with Alternatives

| Feature          | Responzo ✅      | react-native-responsive-screen | react-native-size-matters |
| ---------------- | ---------------- | ------------------------------ | ------------------------- |
| Notch Detection  | ✅ Yes           | ❌ No                          | ❌ No                     |
| Tablet Detection | ✅ Yes           | ❌ No                          | ❌ No                     |
| Font Scaling     | ✅ Smart scaling | ✅ Basic scaling               | ✅ Basic scaling          |
| TypeScript       | ✅ Full support  | ❌ Partial                     | ❌ No                     |
| Performance      | ⚡ Lightweight   | ⚡ Lightweight                 | ⚡ Lightweight            |
| Maintenance      | 🆕 Active        | 🕒 Less active                 | 🕒 Less active            |
| Import Issues    | ⚠️ Some reported | ✅ Stable                      | ✅ Stable                 |

---

## 🐛 Known Issues

1. **Import/Export Issues**: Some users report import problems. Try different import methods shown above.
2. **TypeScript Definitions**: If TypeScript errors occur, try `npm install @types/react-native-device-info`

---

<!-- ## 📝 Changelog

### v1.0.0 (Latest)
- Initial release
- Core responsive functions
- Device detection features
- TypeScript support

--- -->

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Use GitHub issues to report problems
2. **Suggest Features**: Share your ideas for improvements
3. **Submit PRs**: Fix bugs or add features
4. **Improve Docs**: Help make documentation clearer

### Development Setup

```bash
git clone https://github.com/ganesh1011/react-native-responzo.git
cd react-native-responzo
npm install
npm run test
```

---

## 💬 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/ganesh1011/react-native-responzo/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Share experiences and solutions with other users

---

## 📜 License

MIT © 2023 Ganesh Jayaprakash  
See the [LICENSE](./LICENSE) file for full details.

---

## 📧 Contact

**Ganesh Jayaprakash**

- GitHub: [@ganesh1011](https://github.com/ganesh1011)
- npm: [@ganesh1011](https://www.npmjs.com/~ganesh1011)

---

_Made with ❤️ for the React Native community_
