import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Audio } from 'expo-av'; // Use expo-av for audio



import statePaths from '../data/statePaths.json';
import stateInfo from '../data/stateInfo.json';
import audioMap from '../data/audioMap';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const highlightColor = '#66ff00';

const IndiaMap = ({ onStatePress, selectedStateId, mode, ...props }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [sound, setSound] = useState(null);
  const [tempHighlightId, setTempHighlightId] = useState(null);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const handleStatePress = async (stateId, event) => {
    try {
      const nativeEvent = event?.nativeEvent || {};
      const { locationX, locationY, pageX, pageY } = nativeEvent;
      const viewBoxWidth = 650;
      const viewBoxHeight = 900;
      const scaleX = containerSize.width / viewBoxWidth || 1;
      const scaleY = containerSize.height / viewBoxHeight || 1;
      const adjustedX = locationX ? (locationX / scale.value) * scaleX : 0;
      const adjustedY = locationY ? (locationY / scale.value) * scaleY : 0;

      const adjustedEvent = {
        nativeEvent: {
          locationX: adjustedX,
          locationY: adjustedY,
          pageX: pageX || 0,
          pageY: pageY || 0,
        },
      };

      // 🔊 AUDIO (only in play mode)
      if (mode === 'play') {
        const soundFile = audioMap[stateId];
        if (soundFile) {
          try {
            // Unload previous sound if it exists
            if (sound) {
              await sound.unloadAsync().catch((err) => console.warn(`Error unloading sound: ${err.message}`));
              setSound(null);
            }

            // Load and play new sound
            const { sound: newSound } = await Audio.Sound.createAsync(
              soundFile,
              { shouldPlay: true } // Auto-play the sound
            );
            setSound(newSound);

            // Cleanup when sound finishes
            newSound.setOnPlaybackStatusUpdate((status) => {
              if (status.didJustFinish) {
                newSound.unloadAsync().catch((err) => console.warn(`Error unloading finished sound: ${err.message}`));
                setSound(null);
              }
            });
          } catch (error) {
            console.error(`Error playing sound for ${stateId}: ${error.message}`);
          }
        } else {
          console.warn(`No sound file found for state ${stateId}`);
        }
      }

      // ✅ Always call onStatePress
      if (onStatePress) {
        onStatePress(stateId, adjustedEvent);
      }

      // 🟢 Temporary highlight in play mode
      if (mode === 'play') {
        setTempHighlightId(stateId);
        setTimeout(() => setTempHighlightId(null), 3000);
      }
    } catch (error) {
      console.error(`Error in handleStatePress for ${stateId}: ${error.message}`);
    }
  };

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onUpdate((e) => {
      const prevScale = scale.value;
      const newScale = Math.max(0.5, Math.min(prevScale * e.scale, 3));
      scale.value = newScale;

      const viewBoxWidth = 650;
      const viewBoxHeight = 900;
      const scaleX = containerSize.width / viewBoxWidth || 1;
      const scaleY = containerSize.height / viewBoxHeight || 1;
      const focalXInViewBox = focalX.value / scaleX;
      const focalYInViewBox = focalY.value / scaleY;

      translateX.value += (focalXInViewBox * (prevScale - newScale)) / newScale;
      translateY.value += (focalYInViewBox * (prevScale - newScale)) / newScale;
    });

  const panGesture = Gesture.Pan()
    .minDistance(5)
    .minPointers(1)
    .maxPointers(2)
    .onUpdate((e) => {
      const viewBoxWidth = 650;
      const viewBoxHeight = 900;
      const scaleX = containerSize.width / viewBoxWidth || 1;
      const scaleY = containerSize.height / viewBoxHeight || 1;
      const maxTranslateX = (viewBoxWidth * scale.value) / 2;
      const maxTranslateY = (viewBoxHeight * scale.value) / 2;

      translateX.value = Math.max(
        -maxTranslateX,
        Math.min(maxTranslateX, translateX.value + (e.translationX / (scale.value * scaleX)) * 0.3)
      );
      translateY.value = Math.max(
        -maxTranslateY,
        Math.min(maxTranslateY, translateY.value + (e.translationY / (scale.value * scaleY)) * 0.3)
      );
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // 🛑 Stop and unload audio when switching to quiz mode
  useEffect(() => {
    if (mode === 'quiz' && sound) {
      sound.unloadAsync().catch((err) => console.warn(`Error unloading sound on mode change: ${err.message}`));
      setSound(null);
    }
  }, [mode, sound]);

  // 🛑 Cleanup sound on component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch((err) => console.warn(`Error unloading sound on unmount: ${err.message}`));
        setSound(null);
      }
    };
  }, [sound]);

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
        <Svg viewBox="0 0 650 900" width="100%" height="100%" {...props}>
          <Defs />
          {Object.entries(statePaths).map(([stateId, { path }]) => {
            const isSelected = selectedStateId === stateId || tempHighlightId === stateId;
            const shouldDim = (selectedStateId || tempHighlightId) && !isSelected;

            const fillColor = isSelected
              ? highlightColor
              : stateInfo[stateId]?.color || '#d3d3d3';

            return (
              <AnimatedPath
                key={stateId}
                id={stateId}
                d={path}
                fill={fillColor}
                fillOpacity={shouldDim ? 0.2 : 1}
                onPress={(event) => handleStatePress(stateId, event)}
                animatedProps={animatedProps}
                pointerEvents="auto"
                stroke="#F00"
                strokeWidth={stateId === 'IN-LD' ? 3 : 0.1}
              />
            );
          })}
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