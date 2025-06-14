import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import IndiaMap from "./components/IndiaMap";
import stateInfo from "./data/stateInfo.json";

export default function App() {
  const [selectedState, setSelectedState] = useState({
    id: null,
    name: "",
    position: { x: 0, y: 0 }
  });

<<<<<<< HEAD
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedGangaStates, setSelectedGangaStates] = useState([]);

  const gangaStates = Object.keys(stateInfo).filter(
    (id) => stateInfo[id].gangaFlow
  );

  const handleStatePress = (stateId, event) => {
    if (!stateInfo[stateId]) return;

    const state = stateInfo[stateId];
    const isGangaState = state.gangaFlow;

    setSelectedState({
      id: stateId,
      name: state.name,
      position: {
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY
      }
    });

    if (isGangaState) {
      if (!selectedGangaStates.includes(stateId)) {
        const updatedSelection = [...selectedGangaStates, stateId];
        setSelectedGangaStates(updatedSelection);
        setFeedback("correct");

        if (updatedSelection.length === gangaStates.length) {
          setScore((prev) => prev + 1);
          setSelectedGangaStates([]); // reset for next round
        }
      } else {
        setFeedback("already selected");
      }
    } else {
      setFeedback("wrong");
=======
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
>>>>>>> 9358fa1fd7129032d7e3efd314d8522935083a51
    }

    setTimeout(() => {
      setSelectedState({ id: null, name: "", position: { x: 0, y: 0 } });
      setFeedback(null);
    }, 1500);
  };

  const handleReset = () => {
    setScore(0);
    setSelectedGangaStates([]);
    setFeedback(null);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <IndiaMap
        onStatePress={handleStatePress}
        selectedStateId={selectedState.id}
        stateInfo={stateInfo}
      />

      {/* Label */}
      {selectedState.id && (
        <View
          style={[
            styles.labelContainer,
            {
              left: selectedState.position.x - 50,
              top: selectedState.position.y - 30
            }
          ]}
          pointerEvents="none"
        >
          <Text style={styles.labelText}>{selectedState.name}</Text>
=======
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
>>>>>>> 9358fa1fd7129032d7e3efd314d8522935083a51
        </View>
      )}

      {/* Question */}
      <View style={styles.quizBox} pointerEvents="none">
        <Text style={styles.quizText}>
          Tap all states through which the Ganga river flows
        </Text>
      </View>

      {/* Score */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Score: {score}</Text>

        <Pressable onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      {/* Feedback */}
      {feedback && (
        <View
          style={[
            styles.feedbackLight,
            {
              backgroundColor:
                feedback === "correct"
                  ? "green"
                  : feedback === "wrong"
                  ? "red"
                  : "orange"
            }
          ]}
          pointerEvents="none"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    position: "relative",
    backgroundColor: "#fff"
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center"
=======
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
>>>>>>> 9358fa1fd7129032d7e3efd314d8522935083a51
  },
  labelText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  quizBox: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    alignItems: "center"
  },
  quizText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center"
  },
  scoreBox: {
  position: "absolute",
  top: 80,
  left: 20,
  right: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},

  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10
  },
  resetButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  resetText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
  feedbackLight: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.8
  }
});
