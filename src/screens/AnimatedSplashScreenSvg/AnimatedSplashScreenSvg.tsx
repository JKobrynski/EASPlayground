// @ts-nocheck
import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import styles from "./AnimatedSplashScreenSvg.styles";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  runOnJS,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import AnimatedSplashScreenSvgProps from "./AnimatedSplashScreenSvg.props";
import { Svg } from "react-native-svg";
import AnimatedStroke from "../../components/AnimatedStroke";

const vWidth = 289;
const vHeight = 291;

const path =
  "M274 15V275.501M15 15L15 275.501M16.3277 15L109.845 109.059M180.483 181.941L274 276";

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenSvgProps> = ({
  children,
  splash,
}) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [scale, setScale] = useState(0);

  const progress = useSharedValue(0);

  useEffect(() => {
    scaleImage();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      progress.value = withSequence(
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(
          0,
          { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
          () => runOnJS(onAnimationFinished)()
        )
      );
    }
  }, [isAppReady]);

  useEffect(() => {
    if (scale !== 0 && !isAppReady) {
      onScaleCalculated();
    }
  }, [scale, isAppReady]);

  const onAnimationFinished = () => setIsAnimationComplete(true);

  const onScaleCalculated = async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("splash screen error", e);
    } finally {
      setIsAppReady(true);
    }
  };

  const scaleImage = () => {
    const widthScale = splash.width / Dimensions.get("screen").width;
    setScale(1 / widthScale);
  };

  return (
    <>
      {isAppReady && (
        <Animated.View
          entering={FadeIn.duration(1000)}
          style={styles.appWrapper}
        >
          {children}
        </Animated.View>
      )}
      {!isAnimationComplete && (
        <Animated.View
          style={styles.container}
          exiting={FadeOut.duration(1000)}
        >
          <Svg
            width={vWidth}
            height={vHeight}
            viewBox={[0, 0, vWidth, vHeight].join(" ")}
            style={{
              transform: [
                {
                  scale,
                },
              ],
            }}
          >
            <AnimatedStroke d={path} progress={progress} />
          </Svg>
        </Animated.View>
      )}
    </>
  );
};

export default AnimatedSplashScreen;
