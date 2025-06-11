import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import IndiaMap from "./components/IndiaMap";
import stateInfo from "./data/stateInfo.json";

export default function App() {
  const [selectedStateId, setSelectedStateId] = useState(null);

  const handleStatePress = (stateId) => {
    if (stateInfo[stateId]) {
      setSelectedStateId(stateId);
    }
  };

  return (
    <View style={styles.container}>
      <IndiaMap 
        onStatePress={handleStatePress} 
        selectedStateId={selectedStateId} 
        stateInfo={stateInfo}
      />
      {selectedStateId && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            {stateInfo[selectedStateId].name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 8,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
