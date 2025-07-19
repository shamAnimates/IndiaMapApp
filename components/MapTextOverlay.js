import React from 'react';
import Svg, { Text as SvgText, G } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const AnimatedG = Animated.createAnimatedComponent(G);

const MapTextOverlay = ({ scale, translateX, translateY }) => {
  const animatedGroupProps = useAnimatedProps(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));

  return (
    <Svg viewBox="0 0 650 900" width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <AnimatedG animatedProps={animatedGroupProps}>
        <SvgText
          x={300}
          y={250}
          fontSize={20}
          fill="#007AFF"
          fontWeight="bold"
          textAnchor="start"
        >
          VISCON DELHI
        </SvgText>
      </AnimatedG>
    </Svg>
  );
};

export default MapTextOverlay;