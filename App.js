import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import IndiaMap from "./components/IndiaMap";
import stateInfo from "./data/stateInfo.json";

// Static question types (multi-answer)
const baseQuestions = [
  { type: "gangaFlow", text: "Tap all states through which the Ganga river flows", count: 5 },
  { type: "region", value: "North", text: "Tap all North states", count: 9 },
  { type: "region", value: "South", text: "Tap all South states", count: 8 },
  { type: "region", value: "East", text: "Tap all East states", count: 4 },
  { type: "region", value: "West", text: "Tap all West states", count: 5 },
  { type: "region", value: "Central", text: "Tap all Central states", count: 2 },
  { type: "region", value: "Northeast", text: "Tap all Northeast states", count: 8 },
  {
    type: "unionTerritory",
    text: "Tap on all Union Territories",
    count: Object.keys(stateInfo).filter((id) => stateInfo[id].isUnionTerritory).length
  }
];


const getCapitalQuestions = () => {
  return Object.keys(stateInfo).map((id) => ({
    type: "capital",
    value: id,
    text: `Which state has the capital ${stateInfo[id].capital}?`,
    count: 1
  }));
};

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function App() {
  const [selectedState, setSelectedState] = useState({
    id: null,
    name: "",
    position: { x: 0, y: 0 }
  });

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Setup questions on load/reset
  useEffect(() => {
    const allQuestions = [...baseQuestions, ...getCapitalQuestions()];
    setShuffledQuestions(shuffleArray(allQuestions));
  }, []);

  const currentQuestion = shuffledQuestions[questionIndex];

  const getCorrectStates = () => {
    if (!currentQuestion) return [];
    switch (currentQuestion.type) {
      case "gangaFlow":
        return Object.keys(stateInfo).filter((id) => stateInfo[id].gangaFlow);
      case "region":
        return Object.keys(stateInfo).filter(
          (id) => stateInfo[id].region === currentQuestion.value
        );
      case "unionTerritory":
        return Object.keys(stateInfo).filter((id) => stateInfo[id].isUnionTerritory);
      case "capital":
        return [currentQuestion.value]; 
      default:
        return [];
    }
  };

  const correctStates = getCorrectStates();

  const handleStatePress = (stateId, event) => {
    if (!stateInfo[stateId]) return;

    const state = stateInfo[stateId];
    const isCorrect = correctStates.includes(stateId);

    setSelectedState({
      id: stateId,
      name: state.name,
      position: {
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY
      }
    });

    if (isCorrect) {
      if (!selectedStates.includes(stateId)) {
        const updated = [...selectedStates, stateId];
        setSelectedStates(updated);
        setFeedback("correct");

        if (updated.length === currentQuestion.count) {
          setScore((prev) => prev + 1);
          setTimeout(() => {
            const nextIndex = questionIndex + 1;
            if (nextIndex < shuffledQuestions.length) {
              setQuestionIndex(nextIndex);
            } else {
              const allQ = [...baseQuestions, ...getCapitalQuestions()];
              setShuffledQuestions(shuffleArray(allQ));
              setQuestionIndex(0);
            }
            setSelectedStates([]);
          }, 1000);
        }
      } else {
        setFeedback("already selected");
      }
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setSelectedState({ id: null, name: "", position: { x: 0, y: 0 } });
      setFeedback(null);
    }, 1000);
  };

  const handleReset = () => {
    setScore(0);
    setSelectedStates([]);
    setQuestionIndex(0);
    const allQ = [...baseQuestions, ...getCapitalQuestions()];
    setShuffledQuestions(shuffleArray(allQ));
  };

  return (
    <View style={styles.container}>
      <IndiaMap
        onStatePress={handleStatePress}
        selectedStateId={selectedState.id}
        stateInfo={stateInfo}
      />

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
        </View>
      )}

      <View style={styles.quizBox} pointerEvents="none">
        <Text style={styles.quizText}>
          {currentQuestion ? currentQuestion.text : ""}
        </Text>
      </View>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

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
    fontWeight: "bold"
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
