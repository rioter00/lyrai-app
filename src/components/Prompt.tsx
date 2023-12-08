import { useState } from "react";

interface PromptProps {
  prompt1: string;
  prompt2?: string;
  prompt3?: string;
  index: number;
  positionIndex: number;
  slapInterval: number;
}

const Prompt = ({
  prompt1,
  prompt2,
  prompt3,
  index,
  positionIndex,
  slapInterval,
}: PromptProps) => {
  const [slapStyle, setSlapStyle] = useState("bg-primary btn btn-small");
  const [slapIntervalState, setSlapIntervalState] = useState(() => {
    setInterval(() => {
      setSlapStyle("bg-warning btn btn-small");
      setTimeout(() => {
        setSlapStyle("bg-primary btn btn-small");
      }, 500);
    }, slapInterval);
  });

  return (
    console.log("Slap interval: ", slapIntervalState),
    console.log("Slap style: ", setSlapIntervalState),
    (
      <>
        <h4>Instructions</h4>
        <div className="">
          <button id="slapButton" className={slapStyle}>
            SLAP
          </button>
        </div>
        <p className="mt-3">{prompt1}</p>
        <p>{prompt2}</p>
        <p>{prompt3}</p>
        <small>
          Prompt Index {index} - Position Index {positionIndex}
        </small>
      </>
    )
  );
};
export default Prompt;
