import { useRef, useState } from 'react';

export default function AyahAudio({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <audio ref={audioRef} src={audioUrl}></audio>

      {!isPlaying ? (
        <button onClick={handlePlay}>▶️ Play Ayat</button>
      ) : (
        <button onClick={handlePause}>⏸ Pause</button>
      )}
    </div>
  );
}