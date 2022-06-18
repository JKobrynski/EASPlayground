import "react-native-gesture-handler";
import { AnimatedAppLoader } from "./src/components";
import * as SplashScreen from 'expo-splash-screen'

import HomeScreen from "./src/screens/HomeScreen";

SplashScreen.preventAutoHideAsync().catch(() => {
  console.log('SPLASH SCREEN PREVENT ERROR')
})

export default function App() {
  return (
    <AnimatedAppLoader>
      <HomeScreen />
    </AnimatedAppLoader>
  );
}
