import { useState } from "react";
interface AudioProps {
  src: string;
}

const Audio = ({ src }: AudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    console.log("Is playing: ", isPlaying),
    (
      <div className="m-4">
        <audio
          src={src}
          controls={true}
          onPlay={handlePlay}
          onPause={handlePause}
          preload="auto"
        />
      </div>
    )
  );
};

export default Audio;
