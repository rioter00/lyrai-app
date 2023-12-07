import { useState, useEffect } from "react";

import "./App.css";
import Prompt from "./components/Prompt";

function App() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [rowLength, setRowLength] = useState(0);
  const [columnLength, setColumnLength] = useState(0);
  // const [positionIndex, setPositionIndex] = useState(0);

  const gridSize = 3;

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
    if (widthNumber % gridSize == 0) {
      let newLength = Math.floor(widthNumber / gridSize) - 1;
      if (newLength <= 0) {
        newLength = 1;
      }
      setRowLength(newLength);
    } else {
      setRowLength(Math.floor(widthNumber / gridSize));
    }
    if (heightNumber % gridSize == 0) {
      let newHeight = Math.floor(heightNumber / gridSize) - 1;
      if (newHeight <= 0) {
        newHeight = 1;
      }
      setColumnLength(newHeight);
    } else {
      setColumnLength(Math.floor(heightNumber / gridSize));
    }
  };

  const calculatePrompt = () => {
    const positionIndex = Math.floor(promptIndex / 4);
    const currentX = positionIndex % rowLength;
    const currentY = Math.floor(positionIndex / rowLength);
    const currentZ = promptIndex % 4;
    console.log("Current X: ", currentX);
    console.log("Current Y: ", currentY);
    console.log("Current Z: ", currentZ);
    console.log("Prompt Index: ", promptIndex);
    console.log("Position Index: ", positionIndex);
    //
    const prompt1 = `Position Mic at ${currentX * gridSize}, ${
      currentY * gridSize
    }, ${currentZ * gridSize}.`;
    const prompt2 = `Record with impulses at N, E, S, W at 0, 3, 6, 9 heights.`;
    const prompt3 =
      promptIndex % 4 == 2 ? "Record CORNERS and CENTER at 6 feet height." : "";
    return (
      <Prompt
        prompt1={prompt1}
        prompt2={prompt2}
        prompt3={prompt3}
        index={promptIndex}
        positionIndex={positionIndex}
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
      <h1 className="my-4">Lyrai Recording Prompter</h1>
      <div className="row justify-content-between">
        <input
          type="number"
          placeholder="Enter new Wdt."
          id="widthInput"
          className="m-1 col-3 text-center"
        />
        <input
          type="number"
          placeholder="Enter new Ht."
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
        <p>
          {width > 0 && height > 0
            ? `Room Dimensions (ft): ${width} * ${height}. ${" "} Positions: ${rowLength} X : ${columnLength} Y at ${gridSize} ft. intervals.`
            : "Please enter the values"}
        </p>
      </div>
      <hr />
      {/*  */}
      {calculatePrompt()}
      {/*  */}
      <hr />
      <div className="row justify-content-between">
        <button
          className="btn btn-primary btn-sm m-1 col-4"
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
      {/* <div>
        <small>CARDINAL directions N E S W (clockwise)</small>
      </div> */}
    </>
  );
}

export default App;
