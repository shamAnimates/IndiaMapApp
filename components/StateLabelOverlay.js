import React from 'react';
import Svg, { Text as SvgText, G } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import stateLabels from '../data/stateLabels.json';
import { StyleSheet } from 'react-native';

const AnimatedG = Animated.createAnimatedComponent(G);

const StateLabelOverlay = ({ scale, translateX, translateY }) => {
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
        {Object.entries(stateLabels).map(([stateId, { x, y, code }]) => (
          <SvgText
            key={stateId}
            x={x}
            y={y}
            fontSize={10}
            fill="black"
            fontWeight="bold"
            textAnchor="middle"
          >
            {code}
          </SvgText>
        ))}
      </AnimatedG>
    </Svg>
  );
};

export default StateLabelOverlay;
