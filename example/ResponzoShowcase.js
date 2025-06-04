import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import {
  scale,
  spacing,
  typography,
  borderRadius,
  useAdaptive,
  screen,
  utils,
  initAdaptive,
} from "react-native-responzo";

// Initialize with custom configuration for better control
initAdaptive({
  baseWidth: 414, // iPhone 11 Pro width
  baseHeight: 896, // iPhone 11 Pro height
  scalingFactor: 0.3, // Moderate scaling
  tabletBreakpoint: 768, // iPad detection
  spacingBase: 8, // 8px base spacing unit
});

// Demo Components
const FeatureCard = ({ title, description, color = "#3B82F6" }) => (
  <View style={[styles.featureCard, { borderLeftColor: color }]}>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const ResponsiveGrid = ({ items }) => {
  const { orientation, screen: screenInfo } = useAdaptive();

  const getColumns = () => {
    if (screenInfo.isTablet) {
      return orientation.isLandscape ? 3 : 2;
    }
    return orientation.isLandscape ? 2 : 1;
  };

  const columns = getColumns();
  const itemWidth = scale.widthPercent((100 - (columns + 1) * 5) / columns);

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.sectionTitle}>
        Adaptive Grid ({columns} columns -{" "}
        {screenInfo.isTablet ? "Tablet" : "Phone"})
      </Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.gridItem,
              {
                width: itemWidth,
                marginLeft: spacing.sm,
                marginBottom: spacing.sm,
              },
            ]}
          >
            <Text style={styles.gridItemTitle}>{item.title}</Text>
            <Text style={styles.gridItemText}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const ResponsiveForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { screen: screenInfo, scale: adaptiveScale } = useAdaptive();

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Responsive Form</Text>
      <View
        style={[
          styles.form,
          {
            width: screenInfo.isTablet
              ? scale.widthPercent(100)
              : scale.widthPercent(100),
          },
        ]}
      >
        <Text style={styles.formTitle}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => Alert.alert("Success", "Form submitted!")}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        {screenInfo.isTablet && (
          <Text style={styles.tabletHint}>
            ✨ Optimized for tablet experience
          </Text>
        )}
      </View>
    </View>
  );
};

const TypographyShowcase = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Typography System</Text>

    <View style={styles.typographyContainer}>
      <Text style={[styles.typographyItem, { fontSize: typography.xxxl }]}>
        XXXL Heading (32px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.xxl }]}>
        XXL Subheading (24px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.xl }]}>
        XL Large Text (20px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.lg }]}>
        Large Text (18px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.base }]}>
        Base Text (16px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.sm }]}>
        Small Text (14px)
      </Text>
      <Text style={[styles.typographyItem, { fontSize: typography.xs }]}>
        Extra Small Text (12px)
      </Text>
    </View>

    <Text style={styles.note}>
      📱 All sizes automatically adjust for tablets (+2px) and scale with device
      size
    </Text>
  </View>
);

const SpacingShowcase = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Spacing System</Text>

    <View style={styles.spacingContainer}>
      {[
        { key: "xs", value: spacing.xs, label: "XS (4px)" },
        { key: "sm", value: spacing.sm, label: "SM (8px)" },
        { key: "md", value: spacing.md, label: "MD (16px)" },
        { key: "lg", value: spacing.lg, label: "LG (24px)" },
        { key: "xl", value: spacing.xl, label: "XL (32px)" },
        { key: "xxl", value: spacing.xxl, label: "XXL (48px)" },
      ].map((space) => (
        <View key={space.key} style={styles.spacingItem}>
          <View
            style={[
              styles.spacingBox,
              {
                padding: space.value,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 90%)`,
              },
            ]}
          >
            <Text style={styles.spacingLabel}>{space.label}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const BorderRadiusShowcase = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Border Radius System</Text>

    <View style={styles.borderRadiusContainer}>
      {[
        { key: "none", value: borderRadius.none, label: "None" },
        { key: "sm", value: borderRadius.sm, label: "SM" },
        { key: "base", value: borderRadius.base, label: "Base" },
        { key: "md", value: borderRadius.md, label: "MD" },
        { key: "lg", value: borderRadius.lg, label: "LG" },
        { key: "xl", value: borderRadius.xl, label: "XL" },
      ].map((radius, index) => (
        <View
          key={radius.key}
          style={[
            styles.borderRadiusBox,
            {
              borderRadius: radius.value,
              backgroundColor: `hsl(${index * 60}, 60%, 85%)`,
            },
          ]}
        >
          <Text style={styles.borderRadiusLabel}>{radius.label}</Text>
        </View>
      ))}
    </View>
  </View>
);

const DeviceInfoPanel = () => {
  const { screen: screenInfo, orientation } = useAdaptive();

  return (
    <View style={styles.deviceInfoPanel}>
      <Text style={styles.sectionTitle}>Device Information</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Screen Size</Text>
          <Text style={styles.infoValue}>
            {screenInfo.width} × {screenInfo.height}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Device Type</Text>
          <Text style={styles.infoValue}>
            {screenInfo.isTablet ? "📱 Tablet" : "📱 Phone"}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Orientation</Text>
          <Text style={styles.infoValue}>
            {orientation.isLandscape ? "🔄 Landscape" : "📱 Portrait"}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Aspect Ratio</Text>
          <Text style={styles.infoValue}>
            {orientation.aspectRatio.toFixed(2)}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Pixel Ratio</Text>
          <Text style={styles.infoValue}>{screenInfo.pixelRatio}×</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Breakpoint</Text>
          <Text style={styles.infoValue}>
            {utils.isBreakpoint("xl")
              ? "XL"
              : utils.isBreakpoint("lg")
              ? "LG"
              : utils.isBreakpoint("md")
              ? "MD"
              : "SM"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ResponzoShowcase = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const gridItems = [
    {
      title: "Card 1",
      description: "Responsive card that adapts to screen size",
    },
    { title: "Card 2", description: "Perfect scaling across all devices" },
    { title: "Card 3", description: "Intelligent layout adjustments" },
    { title: "Card 4", description: "Orientation-aware design" },
    { title: "Card 5", description: "Typography that scales beautifully" },
    { title: "Card 6", description: "Consistent spacing system" },
  ];

  const features = [
    {
      title: "🚀 Zero Configuration",
      description: "Works out of the box with intelligent defaults",
      color: "#10B981",
    },
    {
      title: "📱 Universal Compatibility",
      description:
        "Perfect scaling across phones, tablets, and all screen sizes",
      color: "#3B82F6",
    },
    {
      title: "🧠 Intelligent Scaling",
      description: "Advanced algorithms with customizable scaling factors",
      color: "#8B5CF6",
    },
    {
      title: "📏 Complete Design System",
      description: "Typography, spacing, and border radius utilities included",
      color: "#F59E0B",
    },
    {
      title: "🔄 Orientation Aware",
      description: "Real-time orientation change detection and adaptation",
      color: "#EF4444",
    },
    {
      title: "⚡ Performance First",
      description: "Optimized calculations with minimal overhead (~1.5KB)",
      color: "#06B6D4",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <View>
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>React Native Responzo</Text>
              <Text style={styles.heroSubtitle}>
                The ultimate responsive design toolkit for React Native
              </Text>
              <Text style={styles.heroDescription}>
                Create beautiful, responsive UIs that work perfectly across all
                devices with zero configuration required.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Key Features</Text>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </View>
        );

      case "grid":
        return <ResponsiveGrid items={gridItems} />;

      case "form":
        return <ResponsiveForm />;

      case "typography":
        return <TypographyShowcase />;

      case "spacing":
        return <SpacingShowcase />;

      case "borders":
        return <BorderRadiusShowcase />;

      case "device":
        return <DeviceInfoPanel />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Responzo Showcase</Text>
        <Text style={styles.headerSubtitle}>
          Tap tabs below to explore features
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <FlatList
          data={[
            { id: "overview", label: "Overview", icon: "📋" },
            { id: "grid", label: "Grid", icon: "🔲" },
            { id: "form", label: "Form", icon: "📝" },
            { id: "typography", label: "Text", icon: "🔤" },
            { id: "spacing", label: "Spacing", icon: "📏" },
            { id: "borders", label: "Borders", icon: "🔳" },
            { id: "device", label: "Device", icon: "📱" },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === item.id && styles.activeTab]}
              onPress={() => setActiveTab(item.id)}
            >
              <Text style={styles.tabIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === item.id && styles.activeTabLabel,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.tabContentContainer}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>✨ React Native Responzo Demo</Text>
          <Text style={styles.footerSubtext}>
            Bundle size: ~1.5KB • TypeScript native • Zero config
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Header Styles
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: "#64748B",
    textAlign: "center",
    marginTop: spacing.xs,
  },

  // Tab Navigation
  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabContentContainer: {
    paddingHorizontal: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
    alignItems: "center",
    minWidth: scale.width(80),
  },
  activeTab: {
    backgroundColor: "#3B82F6",
  },
  tabIcon: {
    fontSize: typography.base,
    marginBottom: spacing.xs / 2,
  },
  tabLabel: {
    fontSize: typography.xs,
    color: "#64748B",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#FFFFFF",
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },

  // Hero Section
  heroSection: {
    paddingVertical: spacing.xs,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: typography.xxxl,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: typography.lg,
    color: "#3B82F6",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  heroDescription: {
    fontSize: typography.base,
    color: "#64748B",
    textAlign: "center",
    lineHeight: typography.lg,
    paddingHorizontal: spacing.md,
  },

  // Section Styles
  section: {
    marginVertical: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },

  // Feature Cards
  featureCard: {
    backgroundColor: "#FFFFFF",
    padding: spacing.lg,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  featureTitle: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.base,
    color: "#64748B",
    lineHeight: typography.lg,
  },

  // Grid Styles
  gridContainer: {
    marginVertical: spacing.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.sm,
  },
  gridItem: {
    backgroundColor: "#FFFFFF",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  gridItemTitle: {
    fontSize: typography.base,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: spacing.xs,
  },
  gridItemText: {
    fontSize: typography.sm,
    color: "#64748B",
    lineHeight: typography.base,
  },

  // Form Styles
  formContainer: {
    alignItems: "center",
    marginVertical: spacing.xs,
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: typography.xxl,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.base,
    fontWeight: "500",
    color: "#374151",
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: typography.base,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginTop: spacing.md,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: typography.lg,
    fontWeight: "600",
  },
  tabletHint: {
    fontSize: typography.sm,
    color: "#6B7280",
    textAlign: "center",
    marginTop: spacing.md,
    fontStyle: "italic",
  },

  // Typography Showcase
  typographyContainer: {
    backgroundColor: "#FFFFFF",
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  typographyItem: {
    color: "#1E293B",
    marginBottom: spacing.sm,
    fontWeight: "500",
  },

  // Spacing Showcase
  spacingContainer: {
    backgroundColor: "#FFFFFF",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  spacingItem: {
    marginBottom: spacing.sm,
  },
  spacingBox: {
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    minHeight: scale.height(40),
  },
  spacingLabel: {
    fontSize: typography.sm,
    fontWeight: "600",
    color: "#1E293B",
  },

  // Border Radius Showcase
  borderRadiusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  borderRadiusBox: {
    width: scale.widthPercent(28),
    height: scale.height(80),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  borderRadiusLabel: {
    fontSize: typography.sm,
    fontWeight: "600",
    color: "#1E293B",
  },

  // Device Info Panel
  deviceInfoPanel: {
    backgroundColor: "#FFFFFF",
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: scale.widthPercent(45),
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: "#F8FAFC",
    borderRadius: borderRadius.sm,
  },
  infoLabel: {
    fontSize: typography.xs,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: spacing.xs / 2,
  },
  infoValue: {
    fontSize: typography.base,
    color: "#1E293B",
    fontWeight: "600",
  },

  // Footer
  footer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: typography.sm,
    color: "#64748B",
    textAlign: "center",
  },

  // Utility styles
  note: {
    fontSize: typography.sm,
    color: "#64748B",
    fontStyle: "italic",
    marginTop: spacing.md,
    textAlign: "center",
    backgroundColor: "#F1F5F9",
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
});

export default ResponzoShowcase;
