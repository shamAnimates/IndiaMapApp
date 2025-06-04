import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import IndiaMap from "./components/IndiaMap";
import StateInfoModal from "./components/StateInfoModal";
import stateInfo from "./data/stateInfo.json";

export default function App() {
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStatePress = (stateId) => {
    if (stateInfo[stateId]) {
      setSelectedStateId(stateId);
      setModalVisible(true);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedStateId(null);
  };

  return (
    <View style={styles.container}>
      <IndiaMap onStatePress={handleStatePress} />
      <StateInfoModal
        visible={modalVisible}
        onClose={handleClose}
        stateData={stateInfo[selectedStateId]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
