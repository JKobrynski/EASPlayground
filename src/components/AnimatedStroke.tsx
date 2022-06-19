import React, { useRef, useState } from "react";
import { Path } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type AnimatedStrokeProps = {
  d: string;
  progress: Animated.SharedValue<number>;
};

const AnimatedStroke = ({ d, progress }: AnimatedStrokeProps) => {
  const [length, setLength] = useState(0);

  const props = useAnimatedProps(() => ({
    strokeDashoffset: length * progress.value,
  }));

  const ref = useRef<typeof AnimatedPath>(null);

  return (
    <AnimatedPath
      onLayout={() => setLength(ref.current!.getTotalLength() / 3)}
      d={d}
      ref={ref}
      stroke="#00D563"
      strokeWidth={30}
      strokeLinecap="round"
      strokeDasharray={length}
      animatedProps={props}
    />
  );
};

export default AnimatedStroke;
