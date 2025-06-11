import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

const StateInfoModal = ({ visible, onClose, stateData }) => {
  if (!stateData) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{stateData.name}</Text>
          {/* <Text>Capital: {stateData.capital}</Text>
          <Text>Population: {stateData.population}</Text>
          <Text>{stateData.info}</Text> */}
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StateInfoModal;
