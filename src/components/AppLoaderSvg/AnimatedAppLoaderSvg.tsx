import React, { useEffect, useState } from "react";
import { useAssets, Asset } from "expo-asset";
import { AnimatedSplashScreenSvg } from "../../screens";

const splashImage = require("../../../assets/splash-dev.png");

const AnimatedAppLoader: React.FC = ({ children }) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [splash, setSplash] = useState<Asset>();

  useEffect(() => {
    async function prepare() {
      const asset = await Asset.fromModule(splashImage).downloadAsync();
      setSplash(asset);
    }

    prepare();
  }, []);

  useEffect(() => {
    if (splash && !isSplashReady) setIsSplashReady(true);
  }, [splash]);

  if (!isSplashReady) {
    return null;
  }

  return (
    <AnimatedSplashScreenSvg splash={splash}>
      {children}
    </AnimatedSplashScreenSvg>
  );
};

export default AnimatedAppLoader;
