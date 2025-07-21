import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import IndiaMap from "./components/IndiaMapZoomable2";
import stateInfo from "./data/stateInfo.json";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import StateLabelOverlay from './components/StateLabelOverlay';
import MapTextOverlay from "./components/MapTextOverlay";

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

// ✅ NEW QUESTION SETS
const templeQuestions = [
  { type: "temple", text: "Where is the Golden Temple located?", answer: "Punjab", count: 1 },
  { type: "temple", text: "Where is the Mata Vaishnodevi temple located?", answer: "Jammu and Kashmir", count: 1 },
  { type: "temple", text: "Where is the Jagannath Temple located?", answer: "Odisha", count: 1 },
  { type: "temple", text: "Where is the Kashi Vishwanath Temple located?", answer: "Uttar Pradesh", count: 1 },
  { type: "temple", text: "Where is the Tirupati Temple located?", answer: "Andhra Pradesh", count: 1 },
  { type: "temple", text: "Where is the Somnath Temple located?", answer: "Gujarat", count: 1 }
];

const riverQuestions = [
  { type: "river", text: "Which river flows through Assam?", answer: "Assam", count: 1 },
  { type: "river", text: "Which river flows through Gujarat?", answer: "Gujarat", count: 1 },
  { type: "river", text: "Which river is the most sacred in India?", answer: "Ganga", count: 1 },
  { type: "river", text: "Which river flows beside Delhi?", answer: "Delhi", count: 1 },
  { type: "river", text: "Which river flows beside Delhi?", answer: "Delhi", count: 1 }
];

const damQuestions = [
  { type: "dam", text: "Where is the Bhakra Nangal Dam located?", answer: "Himachal Pradesh", count: 1 },
  { type: "dam", text: "Where is the Tehri Dam located?", answer: "Uttarakhand", count: 1 },
  { type: "dam", text: "Which UT has the Cellular Jail?", answer: "Andaman and Nicobar Islands", count: 1 }
];

const mountainsQuestions = [
  { type: "mountains", text: "Where is Darjeeling located?", answer: "West Bengal", count: 1 },
  { type: "mountains", text: "Which state has the Aravalli Range?", answer: "Rajasthan", count: 1 },
  { type: "mountains", text: "Where are the Shivalik Hills located?", answer: "Himachal Pradesh", count: 1 },
  { type: "mountains", text: "Which state has the Himalaya Range?", answer: "Uttarakhand", count: 1 }
];

const monumentsQuestions = [
  { type: "monuments", text: "Where is Gir National Park located?", answer: "Gujarat", count: 1 },
  { type: "monuments", text: "Where is Charankar Solar Park located?", answer: "Gujarat", count: 1 },
  { type: "monuments", text: "Where is the Jaisalmer Solar Park located?", answer: "Rajasthan", count: 1 }
];


const agricultureQuestions = [
  { type: "agriculture", text: "Which state is the largest wheat producer?", answer: "Punjab", count: 1 },
  { type: "agriculture", text: "Which state is the largest sugarcane producer?", answer: "Uttar Pradesh", count: 1 },
  { type: "agriculture", text: "Which state is the largest tea producer?", answer: "Assam", count: 1 },
  { type: "agriculture", text: "Which state is the largest coffee producer?", answer: "Karnataka", count: 1 }
];


const lakeQuestions = [
  { type: "lake", text: "Where is Dal Lake located?", answer: "Jammu and Kashmir", count: 1 },
  { type: "lake", text: "Where is Chandigarh Lake located?", answer: "Chandigarh", count: 1 },
  { type: "lake", text: "Where is Hyderabad Lake located?", answer: "Telangana", count: 1 }
];


const naturalResourcesQuestions = [
  { type: "naturalResources", text: "Where is a gold mine located in India?", answer: "Karnataka", count: 1 },
  { type: "naturalResources", text: "Where is the Panna diamond mine located?", answer: "Madhya Pradesh", count: 1 }
];

const airportQuestions = [
  { type: "airport", text: "Where is IGI Airport located?", answer: "Delhi", count: 1 }
];

const seaportQuestions = [
  { type: "seaport", text: "Where is Kandla Port located?", answer: "Gujarat", count: 1 }
];

const islandsQuestions = [
  { type: "islands", text: "Which UT has its capital at Port Blair?", answer: "Andaman and Nicobar Islands", count: 1 },
  { type: "islands", text: "Where is Lakshadweep Island located?", answer: "Lakshadweep", count: 1 },
  { type: "islands", text: "Where is the Cellular Jail located?", answer: "Andaman and Nicobar Islands", count: 1 }
];


const importantPlacesQuestions = [
  { type: "importantPlaces", text: "Which state borders Pakistan and China?", answer: "Ladakh", count: 1 },
  { type: "importantPlaces", text: "Where is the Atal Tunnel located?", answer: "Himachal Pradesh", count: 1 },
  { type: "importantPlaces", text: "Where is Gir National Park located?", answer: "Gujarat", count: 1 },
  { type: "importantPlaces", text: "Where are the Ajanta Caves located?", answer: "Maharashtra", count: 1 },
  { type: "importantPlaces", text: "Which is the most populous state in India?", answer: "Uttar Pradesh", count: 1 },
  { type: "importantPlaces", text: "Which state has the highest population density?", answer: "Bihar", count: 1 },
  { type: "importantPlaces", text: "Which river flows through Assam?", answer: "Assam", count: 1 },
  { type: "importantPlaces", text: "Where is the Periyar Tiger Reserve located?", answer: "Kerala", count: 1 },
  { type: "importantPlaces", text: "Where is Charankar Solar Park located?", answer: "Gujarat", count: 1 },
  { type: "importantPlaces", text: "Where is the Jaisalmer Solar Park located?", answer: "Rajasthan", count: 1 },
  { type: "importantPlaces", text: "What is the summer capital of Himachal Pradesh?", answer: "Himachal Pradesh", count: 1 },
  { type: "importantPlaces", text: "Where is Darjeeling located?", answer: "West Bengal", count: 1 },
  { type: "importantPlaces", text: "Which city is called Diamond City?", answer: "Gujarat", count: 1 },
  { type: "importantPlaces", text: "Which UT has Punjabi as official language?", answer: "Chandigarh", count: 1 },
  { type: "importantPlaces", text: "Which city is a major IT hub?", answer: "Telangana", count: 1 },
  { type: "importantPlaces", text: "Which city is known for IT and BPO services?", answer: "Haryana", count: 1 },
  { type: "importantPlaces", text: "Where is the Maruti car manufacturing cluster located?", answer: "Haryana", count: 1 },
  { type: "importantPlaces", text: "Where are Tata Motors and Tata Steel hubs?", answer: "Jharkhand", count: 1 },
  { type: "importantPlaces", text: "Where is a nuclear power plant located?", answer: "Maharashtra", count: 1 },
  { type: "importantPlaces", text: "Where is the earliest sunrise in India seen?", answer: "Arunachal Pradesh", count: 1 },
  { type: "importantPlaces", text: "Where is the Chenab Bridge located?", answer: "Jammu and Kashmir", count: 1 },
  { type: "importantPlaces", text: "Where is the centre of Bollywood?", answer: "Maharashtra", count: 1 },
  { type: "importantPlaces", text: "Where is Ramoji Film City located?", answer: "Telangana", count: 1 },
  { type: "importantPlaces", text: "Where is ISRO headquartered?", answer: "Karnataka", count: 1 },
  { type: "importantPlaces", text: "Where is Hussain Sagar Lake located?", answer: "Telangana", count: 1 }
];

const miscellaneousQuestions = [
  { type: "miscellaneous", text: "Which is the most literate state?", answer: "Kerala", count: 1 },
  { type: "miscellaneous", text: "Where did the Green Revolution start?", answer: "Punjab", count: 1 },
  { type: "miscellaneous", text: "Where is the highest rainfall recorded?", answer: "Meghalaya", count: 1 }
];


const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function App() {
  const [mode, setMode] = useState("quiz");
  const [selectedState, setSelectedState] = useState({ id: null, name: "", position: { x: 0, y: 0 } });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionCode, setQuestionCode] = useState("");

  useEffect(() => {
    const allQuestions = [
      ...baseQuestions,
      ...getCapitalQuestions(),
      ...templeQuestions,
      ...riverQuestions,
      ...damQuestions,
      ...mountainsQuestions,
      ...agricultureQuestions,
      ...lakeQuestions,
      ...naturalResourcesQuestions,
      ...airportQuestions,
      ...seaportQuestions,
      ...islandsQuestions,
      ...importantPlacesQuestions,
      ...miscellaneousQuestions
    ];
    setShuffledQuestions(shuffleArray(allQuestions));
  }, []);

  const currentQuestion = shuffledQuestions[questionIndex];

  const findStateIdByName = (name) => {
    return Object.keys(stateInfo).find(
      (id) => stateInfo[id].name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const getCorrectStates = () => {
    if (!currentQuestion) return [];
    switch (currentQuestion.type) {
      case "gangaFlow":
        return Object.keys(stateInfo).filter((id) => stateInfo[id].gangaFlow);
      case "region":
        return Object.keys(stateInfo).filter((id) => stateInfo[id].region === currentQuestion.value);
      case "unionTerritory":
        return Object.keys(stateInfo).filter((id) => stateInfo[id].isUnionTerritory);
      case "capital":
        return [currentQuestion.value];
      default:
        return [findStateIdByName(currentQuestion.answer)];
    }
  };

  const handleStatePress = (stateId, event) => {
    if (mode !== "quiz" || !stateInfo[stateId]) return;
    const isCorrect = getCorrectStates().includes(stateId);

    setSelectedState({
      id: stateId,
      name: stateInfo[stateId].name,
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
    const allQ = [
  ...baseQuestions,
  ...getCapitalQuestions(),
  ...templeQuestions,
  ...riverQuestions,
  ...damQuestions,
  ...mountainsQuestions,
  ...agricultureQuestions,
  ...lakeQuestions,
  ...naturalResourcesQuestions,
  ...airportQuestions,
  ...seaportQuestions,
  ...islandsQuestions,
  ...importantPlacesQuestions,
  ...miscellaneousQuestions,
  ...monumentsQuestions
];

    setShuffledQuestions(shuffleArray(allQ));
  };

  const handleCodeSubmit = () => {
    const code = questionCode.trim();
    let newQuestionList = [];

    if (code === "00") newQuestionList = baseQuestions.filter((q) => q.type === "gangaFlow");
    else if (code === "01") newQuestionList = baseQuestions.filter((q) => q.type === "region");
    else if (code === "02") newQuestionList = getCapitalQuestions();
    else if (code === "03") newQuestionList = templeQuestions;
    else if (code === "04") newQuestionList = riverQuestions;
    else if (code === "05") newQuestionList = damQuestions;
    else if (code === "06") newQuestionList = mountainsQuestions;
    else if (code === "07") newQuestionList = agricultureQuestions;
    else if (code === "08") newQuestionList = lakeQuestions;
    else if (code === "09") newQuestionList = naturalResourcesQuestions;
    else if (code === "10") newQuestionList = airportQuestions;
    else if (code === "11") newQuestionList = seaportQuestions;
    else if (code === "12") newQuestionList = islandsQuestions;
    else if (code === "13") newQuestionList = importantPlacesQuestions;
    else if (code === "14") newQuestionList = miscellaneousQuestions;
    else if (code === "15") newQuestionList = monumentsQuestions;

    else newQuestionList = [...baseQuestions, ...getCapitalQuestions()];

    setShuffledQuestions(shuffleArray(newQuestionList));
    setQuestionIndex(0);
    setSelectedStates([]);
    setQuestionCode("");
  };

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Same UI as before... */}
        {/* Keep your entire UI rendering here unchanged. */}
<View style={styles.container}>
          <IndiaMap
            onStatePress={handleStatePress}
            selectedStateId={selectedState.id}
            stateInfo={stateInfo}
            mode={mode}

            scale={scale}
            translateX={translateX}
            translateY={translateY}
          />
          <StateLabelOverlay
            scale={scale}
            translateX={translateX}
            translateY={translateY}
          />
          <MapTextOverlay
            scale={scale}
            translateX={translateX}
            translateY={translateY}
          />

          {mode === "quiz" && selectedState.id && (
            <View style={[styles.labelContainer, { left: selectedState.position.x - 50, top: selectedState.position.y - 30 }]} pointerEvents="none">
              <Text style={styles.labelText}>{selectedState.name}</Text>
            </View>
          )}

          {mode === "quiz" && (
            <>
              <View style={styles.quizBox} pointerEvents="none">
                <Text style={styles.quizText}>
                  {currentQuestion ? currentQuestion.text : ""}
                </Text>
              </View>

              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Score: {score}</Text>
                <View style={styles.rightControls}>
                  <Pressable style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.resetText}>Reset</Text>
                  </Pressable>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.codeInput}
                      placeholder="Enter code"
                      placeholderTextColor="#ccc"
                      value={questionCode}
                      onChangeText={setQuestionCode}
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                    <Pressable style={styles.submitButton} onPress={handleCodeSubmit}>
                      <Text style={styles.resetText}>Go</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {feedback && (
                <View style={[styles.feedbackLight, {
                  backgroundColor:
                    feedback === "correct" ? "green" :
                      feedback === "wrong" ? "red" : "orange"
                }]} pointerEvents="none" />
              )}
            </>
          )}

          {/* ✅ Mode buttons at the bottom */}
          <View style={styles.bottomBar}>
            <Pressable style={[styles.modeButton, mode === "quiz" && styles.activeMode]} onPress={() => setMode("quiz")}>
              <Text style={styles.modeButtonText}>Quiz Mode</Text>
            </Pressable>
            <Pressable style={[styles.modeButton, mode === "play" && styles.activeMode]} onPress={() => setMode("play")}>
              <Text style={styles.modeButtonText}>Play Mode</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "#fff" },
  // ... your existing styles unchanged
 labelContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  labelText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  quizBox: { position: "absolute", top: 40, left: 20, right: 20, alignItems: "center" },
  quizText: { fontSize: 18, fontWeight: "600", textAlign: "center" },
  scoreBox: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  scoreText: { fontSize: 16, fontWeight: "bold" },
  rightControls: { alignItems: "flex-end" },
  resetButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  inputRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    width: 100,
    color: "#000"
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 6
  },
  resetText: { color: "white", fontWeight: "bold", fontSize: 14 },
  feedbackLight: {
    position: "absolute",
    bottom: 80,
    left: "50%",
    transform: [{ translateX: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.8
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    zIndex: 10
  },
  modeButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 40
  },
  activeMode: {
    backgroundColor: '#007AFF'
  },
  modeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
