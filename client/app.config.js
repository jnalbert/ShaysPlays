import 'dotenv/config';

export default {
  expo: {
    name: "Shays Plays",
    slug: "ShaysPlays",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/SmallLogo.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/FullLogo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffffe"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.jnalbert.shaysplays",
      buildNumber: "2",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/SmallLogo.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/SmallLogo.png"
    },
    extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      }
  }
}
