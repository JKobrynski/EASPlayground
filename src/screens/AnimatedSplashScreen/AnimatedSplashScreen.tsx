// @ts-nocheck
import { View, Text, Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreenProps from "./AnimatedSplashScreen.props";
import styles from "./AnimatedSplashScreen.styles";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  children,
  icon,
  splash,
}) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [iconDimensions, setIconDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const scale = useSharedValue(1);

  useEffect(() => {
    scaleImage();
  }, []);

  useEffect(() => {
    if(isAppReady) {
      scale.value = withTiming(0, { duration: 1000 }, () => runOnJS(onAnimationFinished)())
    }
  }, [isAppReady])

  const onImageLoaded = async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("splash screen error", e);
    } finally {
      setIsAppReady(true);
    }
  };

  const scaleImage = () => {
    // Calculate scale down ratio of the splash screen
    // Splash screen is scaled down using resizeMode: contain
    // See examples in expo docs https://docs.expo.dev/guides/splash-screens/#splashresizemode
    const widthScale = splash.width / Dimensions.get("screen").width;

    // Aspect ratio of icon image
    const iconAspectRatio = icon.width / icon.height;

    // Scale down icon's width according to splash screen's scale
    const scaledWidth = icon.width / widthScale;

    // Scale scale icon's height according to its aspect ratio
    const scaledHeight = scaledWidth / iconAspectRatio;

    setIconDimensions({
      width: scaledWidth,
      height: scaledHeight,
    });
  };

  const onAnimationFinished = () => setIsAnimationComplete(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value
      }
    ]
  }), [])

  return (
    <>
      {isAppReady && isAnimationComplete && <>{children}</>}
      {!isAnimationComplete && (
        <View style={styles.container}>
          <Animated.Image
            source={icon}
            onLoadEnd={onImageLoaded}
            style={[
              styles.icon,
              {
                width: iconDimensions.width,
                height: iconDimensions.height,
              },
              animatedStyle
            ]}
            fadeDuration={0}
          />
        </View>
      )}
    </>
  );
};

export default AnimatedSplashScreen;
