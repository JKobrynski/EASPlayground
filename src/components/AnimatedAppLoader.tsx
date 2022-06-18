import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAssets } from "expo-asset";
import { AnimatedSplashScreen } from "../screens";

const ngLogo = require("../../assets/ng-logo.png");
const splashImage = require("../../assets/splash-dev.png");

const AnimatedAppLoader: React.FC = ({ children }) => {
  const [assets, error] = useAssets([ngLogo, splashImage]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (!assets?.length) {
    return null
  }

  const [icon, splash] = assets;

  return (
    <AnimatedSplashScreen icon={icon} splash={splash}>
      {children}
    </AnimatedSplashScreen>
  );
};

export default AnimatedAppLoader;
