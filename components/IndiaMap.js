
import * as React from "react"
import Svg, { Defs, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */
import statePath from "../data/statePaths.json"


//const stateInfo["IN-AN"].color = "#d3d3d3";   // Light grey for unselected states
const highlightColor = "#66ff00"; // Highlight color for selected state



const IndiaMap = ({ onStatePress, selectedStateId,stateInfo, event }, props) => (

  
  


  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 900"
    width="100%"
    height="100%"
    pointerEvents="box-none"
    {...props}>
    <Defs></Defs>
    <Path
      id="IN-AN"
       className="land" d={statePath["IN-AN"].path} 
      //fill={'#FFC107'}
       onPress={(event) => onStatePress("IN-AN",event)}
        fill={selectedStateId === "IN-AN" ? highlightColor : stateInfo["IN-AN"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-AN" ? 1 : 0.2}
    />
   

    <Path
      id="IN-AP"
      className="land" d={statePath["IN-AP"].path}
      //fill={'#33FFBD'}
      onPress={(event) => onStatePress("IN-AP",event)}
        fill={selectedStateId === "IN-AP" ? highlightColor : stateInfo["IN-AP"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-AP" ? 1 : 0.2}
    />
    <Path
      id="IN-AR"
       className="land" d={statePath["IN-AR"].path}
      onPress={(event) => onStatePress("IN-AR" ,event)}
        fill={selectedStateId === "IN-AR" ? highlightColor : stateInfo["IN-AR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-AR" ? 1 : 0.2}
    />
    <Path
      id="IN-AS"
      className="land" d={statePath["IN-AS"].path}
      onPress={(event) => onStatePress("IN-AS", event)}
        fill={selectedStateId === "IN-AS" ? highlightColor : stateInfo["IN-AR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-AS" ? 1 : 0.2}
    />
    <Path
      id="IN-BR"
      className="land" d={statePath["IN-BR"].path}
      onPress={(event) => onStatePress("IN-BR",event)}
        fill={selectedStateId === "IN-BR" ? highlightColor : stateInfo["IN-BR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-BR" ? 1 : 0.2}
    />
    <Path
      id="IN-CH"
      className="land" d={statePath["IN-CH"].path}
      onPress={(event) => onStatePress("IN-CH",event)}
        fill={selectedStateId === "IN-CH" ? highlightColor : stateInfo["IN-CH"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-CH" ? 1 : 0.2}
    />
    <Path
      id="IN-CT"
       className="land" d={statePath["IN-CT"].path}
      onPress={(event) => onStatePress("IN-CT",event)}
        fill={selectedStateId === "IN-CT" ? highlightColor : stateInfo["IN-CT"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-CT" ? 1 : 0.2}
    />
    <Path
      id="IN-DD"
      className="land" d={statePath["IN-DD"].path}
      onPress={(event) => onStatePress("IN-DD",event)}
        fill={selectedStateId === "IN-DD" ? highlightColor : stateInfo["IN-DD"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-DD" ? 1 : 0.2}
    />
    <Path
      id="IN-DL"
       className="land" d={statePath["IN-DL"].path}
      onPress={(event) => onStatePress("IN-DL",event)}
        fill={selectedStateId === "IN-DL" ? highlightColor : stateInfo["IN-DL"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-DL" ? 1 : 0.2}
    />
    {/* <Path
      id="IN-DN"
      className="land" d={statePath["IN-DN"].path}
      onPress={(event) => onStatePress("IN-DN",event)}
        fill={selectedStateId === "IN-DN" ? highlightColor : stateInfo["IN-DN"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-DN" ? 1 : 0.2}
    /> */}
    <Path
      id="IN-GA"
     className="land" d={statePath["IN-GA"].path}
      onPress={(event) => onStatePress("IN-GA",event)}
        fill={selectedStateId === "IN-GA" ? highlightColor : stateInfo["IN-GA"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-GA" ? 1 : 0.2}
    />
    <Path
      id="IN-GJ"
       className="land" d={statePath["IN-GJ"].path}
      onPress={(event) => onStatePress("IN-GJ",event)}
        fill={selectedStateId === "IN-GJ" ? highlightColor : stateInfo["IN-GJ"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-GJ" ? 1 : 0.2}
    />
    <Path
      id="IN-HP"
      className="land" d={statePath["IN-HP"].path}
      onPress={(event) => onStatePress("IN-HP",event)}
        fill={selectedStateId === "IN-HP" ? highlightColor : stateInfo["IN-HP"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-HP" ? 1 : 0.2}
    />
    <Path
      id="IN-HR"
       className="land" d={statePath["IN-HR"].path}
      onPress={(event) => onStatePress("IN-HR",event)}
        fill={selectedStateId === "IN-HR" ? highlightColor : stateInfo["IN-HR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-HR" ? 1 : 0.2}
    />
    <Path
      id="IN-JH"
       className="land" d={statePath["IN-JH"].path}
      onPress={(event) => onStatePress("IN-JH",event)}
        fill={selectedStateId === "IN-JH" ? highlightColor : stateInfo["IN-JH"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-JH" ? 1 : 0.2}
    />
    <Path
      id="IN-JK"
      className="land" d={statePath["IN-JK"].path}
      onPress={(event) => onStatePress("IN-JK",event)}
        fill={selectedStateId === "IN-JK" ? highlightColor : stateInfo["IN-JK"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-JK" ? 1 : 0.2}
    />
    <Path
      id="IN-KA"
       className="land" d={statePath["IN-KA"].path}
      onPress={(event) => onStatePress("IN-KA",event)}
        fill={selectedStateId === "IN-KA" ? highlightColor : stateInfo["IN-KA"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-KA" ? 1 : 0.2}
    />
    <Path
      id="IN-KL"
       className="land" d={statePath["IN-KL"].path}
      onPress={(event) => onStatePress("IN-KL",event)}
        fill={selectedStateId === "IN-KL" ? highlightColor : stateInfo["IN-KL"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-KL" ? 1 : 0.2}
    />
    <Path
      id="IN-LD"
      className="land" d={statePath["IN-LD"].path}
      onPress={(event) => onStatePress("IN-LD",event)}
        fill={selectedStateId === "IN-LD" ? highlightColor : stateInfo["IN-LD"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-LD" ? 1 : 0.2}
      
      stroke="#f00"
      strokeWidth={3}


    />
    <Path
      id="IN-MH"
       className="land" d={statePath["IN-MH"].path}
      onPress={(event) => onStatePress("IN-MH",event)}
        fill={selectedStateId === "IN-MH" ? highlightColor : stateInfo["IN-MH"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-MH" ? 1 : 0.2}
    />
    <Path
      id="IN-ML"
      className="land" d={statePath["IN-ML"].path}
      onPress={(event) => onStatePress("IN-ML",event)}
        fill={selectedStateId === "IN-ML" ? highlightColor : stateInfo["IN-ML"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-ML" ? 1 : 0.2}
    />
    <Path
      id="IN-MN"
       className="land" d={statePath["IN-MN"].path}
      onPress={(event) => onStatePress("IN-MN",event)}
        fill={selectedStateId === "IN-MN" ? highlightColor : stateInfo["IN-MN"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-MN" ? 1 : 0.2}
    />
    <Path
      id="IN-MP"
      className="land" d={statePath["IN-MP"].path}
      onPress={(event) => onStatePress("IN-MP",event)}
        fill={selectedStateId === "IN-MP" ? highlightColor : stateInfo["IN-MP"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-MP" ? 1 : 0.2}
    />
    <Path
      id="IN-MZ"
       className="land" d={statePath["IN-MZ"].path}
      onPress={(event) => onStatePress("IN-MZ",event)}
        fill={selectedStateId === "IN-MZ" ? highlightColor : stateInfo["IN-MZ"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-MZ" ? 1 : 0.2}
    />
    <Path
      id="IN-NL"
      className="land" d={statePath["IN-NL"].path}
      onPress={(event) => onStatePress("IN-NL",event)}
        fill={selectedStateId === "IN-NL" ? highlightColor : stateInfo["IN-NL"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-NL" ? 1 : 0.2}
    />
    <Path
      id="IN-OR"
      className="land" d={statePath["IN-OR"].path}
      onPress={(event) => onStatePress("IN-OR",event)}
        fill={selectedStateId === "IN-OR" ? highlightColor : stateInfo["IN-OR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-OR" ? 1 : 0.2}
    />
    <Path
      id="IN-PB"
       className="land" d={statePath["IN-PB"].path}
      onPress={(event) => onStatePress("IN-PB",event)}
        fill={selectedStateId === "IN-PB" ? highlightColor : stateInfo["IN-PB"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-PB" ? 1 : 0.2}
    />
    <Path
      id="IN-PY"
        className="land" d={statePath["IN-PY"].path}
      onPress={(event) => onStatePress("IN-PY",event)}
        fill={selectedStateId === "IN-PY" ? highlightColor : stateInfo["IN-PY"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-PY" ? 1 : 0.2}
    />
    <Path
      id="IN-RJ"
       className="land" d={statePath["IN-RJ"].path}
      onPress={(event) => onStatePress("IN-RJ",event)}
        fill={selectedStateId === "IN-RJ" ? highlightColor : stateInfo["IN-RJ"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-RJ" ? 1 : 0.2}
    />
    <Path
      id="IN-SK"
       className="land" d={statePath["IN-SK"].path}
      onPress={(event) => onStatePress("IN-SK",event)}
        fill={selectedStateId === "IN-SK" ? highlightColor : stateInfo["IN-SK"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-SK" ? 1 : 0.2}
    />
    <Path
      id="IN-TG"
      
      className="land" d={statePath["IN-TG"].path}
      onPress={(event) => onStatePress("IN-TG",event)}
        fill={selectedStateId === "IN-TG" ? highlightColor : stateInfo["IN-TG"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-TG" ? 1 : 0.2}
    />
    <Path
      id="IN-TN"
      
      className="land" d={statePath["IN-TN"].path}
      onPress={(event) => onStatePress("IN-TN",event)}
        fill={selectedStateId === "IN-TN" ? highlightColor : stateInfo["IN-TN"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-TN" ? 1 : 0.2}
    />
    <Path
      id="IN-TR"
      
      className="land" d={statePath["IN-TR"].path}
      onPress={(event) => onStatePress("IN-TR",event)}
        fill={selectedStateId === "IN-TR" ? highlightColor : stateInfo["IN-TR"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-TR" ? 1 : 0.2}
    />
    <Path
      id="IN-UP"
      
      className="land" d={statePath["IN-UP"].path}
      onPress={(event) => onStatePress("IN-UP",event)}
        fill={selectedStateId === "IN-UP" ? highlightColor : stateInfo["IN-UP"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-UP" ? 1 : 0.2}
    />
    <Path
      id="IN-UT"
      
      className="land" d={statePath["IN-UT"].path}
      onPress={(event) => onStatePress("IN-UT",event)}
        fill={selectedStateId === "IN-UT" ? highlightColor : stateInfo["IN-UT"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-UT" ? 1 : 0.2}
    />
    <Path
      id="IN-WB"
      
      className="land" d={statePath["IN-WB"].path}
      onPress={(event) => onStatePress("IN-WB",event)}
        fill={selectedStateId === "IN-WB" ? highlightColor : stateInfo["IN-WB"].color}
        fillOpacity={!selectedStateId || selectedStateId === "IN-WB" ? 1 : 0.2}
    />
  </Svg>
)
export default IndiaMap
