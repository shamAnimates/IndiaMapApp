import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import IndiaMap from "./components/IndiaMap";
import stateInfo from "./data/stateInfo.json";

export default function App() {
  const [selectedState, setSelectedState] = useState({
    id: null,
    name: "",
    position: { x: 0, y: 0 }
  });

  const handleStatePress = (stateId, event) => {
    if (stateInfo[stateId]) {
      setSelectedState({
        id: stateId,
        name: stateInfo[stateId].name,
        position: {
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <IndiaMap 
        onStatePress={handleStatePress} 
        selectedStateId={selectedState.id} 
        stateInfo={stateInfo}
      />
      {selectedState.id && (
        <View style={[
          styles.labelContainer,
          {
            left: selectedState.position.x - 50, // Adjust based on your label width
            top: selectedState.position.y - 30   // Adjust based on your label height
          }
        ]}>
          <Text style={styles.labelText}>
            {selectedState.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative' // Needed for absolute positioning of label
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
