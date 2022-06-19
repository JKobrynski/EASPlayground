import 'dotenv/config'

const IS_DEV = process.env.APP_VARIANT === "development"

export default {
  name: IS_DEV ? "EASTest-dev" : "EASTest",
  slug: "EASTest",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: IS_DEV ? "./assets/splash-dev.png" : "./assets/splash-demo.png",
    resizeMode: "contain",
    backgroundColor: "#DFE4EA",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? "com.jkobrynski.EASTest.dev" : "com.jkobrynski.EASTest",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: IS_DEV ? "com.jkobrynski.EASTest.dev" : "com.jkobrynski.EASTest",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
