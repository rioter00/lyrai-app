import { useState, useEffect } from "react";

import "./App.css";
import Prompt from "./components/Prompt";
import Audio from "./components/Audio";

function App() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [rowLength, setRowLength] = useState(0);
  const [columnLength, setColumnLength] = useState(0);
  // const [positionIndex, setPositionIndex] = useState(0);

  const gridSize = 6;

  useEffect(() => {
    if (window.localStorage.getItem("width") == "") return;
    console.log(
      "Getting the values: " + typeof window.localStorage.getItem("width")
    );
    const widthNumber = Number(window.localStorage.getItem("width"));
    const heightNumber = Number(window.localStorage.getItem("height"));
    const promptIndex = Number(window.localStorage.getItem("promptIndex"));
    setWidth(widthNumber);
    setHeight(heightNumber);
    setPromptIndex(promptIndex);
    //
    calculatePositions(widthNumber, heightNumber);
  }, []);

  const calculatePositions = (widthNumber: number, heightNumber: number) => {
    if (widthNumber % gridSize < 3) {
      let newLength = Math.floor(widthNumber / gridSize) + 1;
      if (newLength <= 0) {
        newLength = 1;
      }
      setRowLength(newLength);
    } else {
      setRowLength(Math.floor(widthNumber / gridSize) + 2);
    }
    if (heightNumber % gridSize == 0 || heightNumber % gridSize == 1) {
      let newHeight = Math.floor(heightNumber / gridSize) + 1;
      if (newHeight <= 0) {
        newHeight = 1;
      }
      setColumnLength(newHeight);
    } else {
      setColumnLength(Math.floor(heightNumber / gridSize) + 2);
    }
  };

  const calculatePrompt = () => {
    const positionIndex = Math.floor(promptIndex / 12);
    const currentX = positionIndex % rowLength;
    const currentY = Math.floor(positionIndex / rowLength);
    const currentZ = Math.floor(promptIndex / 4) % 3;
    console.log("Current X: ", currentX);
    console.log("Current Y: ", currentY);
    console.log("Current Z: ", currentZ);
    console.log("Prompt Index: ", promptIndex);
    console.log("Position Index: ", positionIndex);
    //
    const XPos =
      currentX == rowLength - 1 ? "W" : (currentX * gridSize).toString();

    const YPos =
      currentY == columnLength - 1 ? "N" : (currentY * gridSize).toString();

    let impulseDireciton;
    switch (Math.floor(promptIndex % 4)) {
      case 0: {
        impulseDireciton = "N";
        break;
      } // North
      case 1: {
        impulseDireciton = "E";
        break;
      } // East
      case 2: {
        impulseDireciton = "S";
        break;
      } // South
      case 3: {
        impulseDireciton = "W";
        break;
      } // West
    }
    const prompt1 = `Position Mic at ${XPos}, ${YPos}, ${currentZ * 6}.`;
    const prompt2 = `Record with impulses at ${impulseDireciton} at 3, 6, 9 heights.`;
    const prompt3 =
      promptIndex % 12 == 7
        ? "Then Record CORNERS and CENTER at 6 feet height."
        : "";
    return (
      <Prompt
        prompt1={prompt1}
        prompt2={prompt2}
        prompt3={prompt3}
        index={promptIndex}
        positionIndex={positionIndex}
        slapInterval={4000}
      />
    );
  };

  const calculateDimnensions = () => {
    const _width = (document.getElementById("widthInput") as HTMLInputElement)
      .value;
    const _height = (document.getElementById("heightInput") as HTMLInputElement)
      .value;
    if (_width == "" || _height == "") return;
    if (_width == null || _height == null) return;
    if (_width == undefined || _height == undefined) return;
    if (_width == "0" || _height == "0") return;

    const widthNumber = Number(_width);
    const heightNumber = Number(_height);
    setWidth(widthNumber);
    setHeight(heightNumber);
    window.localStorage.setItem("width", widthNumber.toString());
    window.localStorage.setItem("height", heightNumber.toString());
    console.log("Setting the values: ", { width }, { height });
    //
    calculatePositions(widthNumber, heightNumber);
  };

  return (
    <>
      <div className="border rounded m-4">
        <div className="bg-warning p-1 w-90 col-12 mb-4">
          <h4 className="mt-4">Lyrai Recording Prompter</h4>
          <span>(0.0.2)</span>
        </div>
        <div className="justify-content-between col-12">
          <input
            type="number"
            placeholder="width"
            id="widthInput"
            className="m-1 col-3 text-center"
          />
          <input
            type="number"
            placeholder="length"
            id="heightInput"
            className="m-1 col-3 text-center"
          />
          <button
            className="m-1 col-3 btn btn-primary btn-sm"
            onClick={() => {
              calculateDimnensions();
            }}
          >
            Submit
          </button>
        </div>
        <div className="row mt-2">
          <small>
            {width > 0 && height > 0
              ? `Room Dimensions (ft): ${width} * ${height}. ${" "} Positions: ${rowLength} X : ${columnLength} Y at ${gridSize} ft. intervals.`
              : "Please enter width and height values"}
          </small>
        </div>
        <hr />
        {/*  */}
        {calculatePrompt()}
        {/*  */}
        <hr />
        <div className="justify-content-between">
          <button
            className="btn btn-primary btn-sm m-1 col-3"
            onClick={() => {
              if (promptIndex == 0) return;
              setPromptIndex(promptIndex - 1);
              window.localStorage.setItem(
                "promptIndex",
                (promptIndex - 1).toString()
              );
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-primary btn-sm m-1 col-4"
            onClick={() => {
              setPromptIndex(0);
              window.localStorage.setItem("promptIndex", (0).toString());
            }}
          >
            Reset Index
          </button>
          <button
            className="btn btn-primary btn-sm m-1 col-3"
            onClick={() => {
              setPromptIndex(promptIndex + 1);
              window.localStorage.setItem(
                "promptIndex",
                (promptIndex + 1).toString()
              );
            }}
          >
            Next
          </button>
        </div>
        {/* <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /> */}
        <Audio src="https://github.com/rioter00/lyrai-app/raw/e84795bf79848a38122d1a97e727a765f1550813/src/assets/meep.wav" />
      </div>
    </>
  );
}

export default App;
