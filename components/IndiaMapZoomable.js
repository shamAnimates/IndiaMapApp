import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedProps } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import statePaths from '../data/statePaths.json';
import stateInfo from '../data/stateInfo.json';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const highlightColor = '#66ff00';

const IndiaMap = ({ onStatePress, selectedStateId, ...props }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useRef(1);
  const savedTranslate = useRef({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Measure container size
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(`Container size: ${width}x${height}`);
    setContainerSize({ width, height });
  };

  // Handle state press with robust error handling
  const handleStatePress = (stateId, event) => {
    try {
      const nativeEvent = event.nativeEvent || {};
      const { locationX, locationY, pageX, pageY } = nativeEvent;
      const viewBoxWidth = 650;
      const viewBoxHeight = 900;
      // Adjust coordinates for scale and viewBox
      const scaleX = containerSize.width / viewBoxWidth || 1;
      const scaleY = containerSize.height / viewBoxHeight || 1;
      const adjustedX = locationX ? (locationX / scale.value) * scaleX : 0;
      const adjustedY = locationY ? (locationY / scale.value) * scaleY : 0;

      console.log(
        `Tapped state: ${stateId}, Scale: ${scale.value.toFixed(2)}, ` +
        `Raw coords: (${locationX?.toFixed(2)}, ${locationY?.toFixed(2)}), ` +
        `Adjusted coords: (${adjustedX.toFixed(2)}, ${adjustedY.toFixed(2)}), ` +
        `Event: ${JSON.stringify(nativeEvent)}`
      );

      const adjustedEvent = {
        nativeEvent: {
          locationX: adjustedX,
          locationY: adjustedY,
          pageX: pageX || 0,
          pageY: pageY || 0,
        },
      };

      if (onStatePress) {
        onStatePress(stateId, adjustedEvent);
      }
    } catch (error) {
      console.error(`Error in handleStatePress for ${stateId}: ${error.message}`);
    }
  };

  // Animated props for each Path
  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Pinch gesture for zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.current * e.scale;
      scale.value = Math.max(0.5, Math.min(newScale, 3));
    })
    .onEnd(() => {
      savedScale.current = scale.value;
    });

  // Pan gesture with constraints
  const panGesture = Gesture.Pan()
    .minDistance(15)
    .onUpdate((e) => {
      const maxTranslate = 200;
      translateX.value = Math.max(-maxTranslate, Math.min(maxTranslate, savedTranslate.current.x + e.translationX));
      translateY.value = Math.max(-maxTranslate, Math.min(maxTranslate, savedTranslate.current.y + e.translationY));
    })
    .onEnd(() => {
      savedTranslate.current = {
        x: translateX.value,
        y: translateY.value,
      };
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Validate stateInfo and statePaths
  useEffect(() => {
    Object.keys(statePaths).forEach((stateId) => {
      if (!stateInfo[stateId]?.color) {
        console.warn(`Missing color for state ${stateId} in stateInfo`);
      }
      if (!statePaths[stateId]?.path) {
        console.warn(`Missing path for state ${stateId} in statePaths`);
      }
    });
  }, []);

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={styles.container} onLayout={onLayout}>
        <Svg
          viewBox="0 0 650 900"
          width="100%"
          height="100%"
          {...props}
        >
          <Defs />
          {Object.entries(statePaths).map(([stateId, { path }]) => (
            <AnimatedPath
              key={stateId}
              id={stateId}
              d={path}
              fill={selectedStateId === stateId ? highlightColor : stateInfo[stateId]?.color || '#d3d3d3'}
              fillOpacity={!selectedStateId || selectedStateId === stateId ? 1 : 0.2}
              onPress={(event) => handleStatePress(stateId, event)}
              animatedProps={animatedProps}
              pointerEvents="auto" // Ensure touch detection
              stroke="#000" // Temporary stroke to visualize hit areas
              strokeWidth={0.5}
            />
          ))}
        </Svg>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default IndiaMap;