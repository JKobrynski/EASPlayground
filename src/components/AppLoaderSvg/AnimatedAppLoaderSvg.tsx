import React, { useEffect } from "react";
import { useAssets } from "expo-asset";
import { AnimatedSplashScreenSvg } from "../../screens";

const splashImage = require("../../../assets/splash-dev.png");

const AnimatedAppLoader: React.FC = ({ children }) => {
  const [assets, error] = useAssets([splashImage]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (!assets?.length) {
    return null;
  }

  const [splash] = assets;

  return (
    <AnimatedSplashScreenSvg splash={splash}>
      {children}
    </AnimatedSplashScreenSvg>
  );
};

export default AnimatedAppLoader;
