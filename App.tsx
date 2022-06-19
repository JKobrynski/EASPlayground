import "react-native-gesture-handler";
import { AnimatedAppLoader, AnimatedAppLoaderSvg } from "./src/components";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["SplashScreen.show"]);

const IS_DEV = process.env.APP_VARIANT === "development";

import HomeScreen from "./src/screens/HomeScreen";

SplashScreen.preventAutoHideAsync().catch(() => {
  console.log("SPLASH SCREEN PREVENT ERROR");
});

const AppLoader = IS_DEV ? AnimatedAppLoaderSvg : AnimatedAppLoader;

export default function App() {
  return (
    <AppLoader>
      <HomeScreen />
    </AppLoader>
  );
}
