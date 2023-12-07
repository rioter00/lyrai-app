interface PromptProps {
  prompt1: string;
  prompt2?: string;
  prompt3?: string;
  index: number;
  positionIndex: number;
}

const Prompt = ({
  prompt1,
  prompt2,
  prompt3,
  index,
  positionIndex,
}: PromptProps) => {
  return (
    <>
      <h2>Instructions</h2>
      <p>{prompt1}</p>
      <p>{prompt2}</p>
      <p>{prompt3}</p>
      <small>
        Prompt Index {index} - Position Index {positionIndex}
      </small>
    </>
  );
};
export default Prompt;
