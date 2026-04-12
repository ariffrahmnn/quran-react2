import { useRef, useState } from 'react';

export default function AyahAudio({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔥 TAMBAHAN: stop semua audio lain
  const stopAllAudio = () => {
    document.querySelectorAll('audio').forEach((audio) => {
      audio.pause();
    });
  };

  const handlePlay = () => {
    if (!audioRef.current) return;

    stopAllAudio(); // 🔥 penting banget (hindari overlap)

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
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)}></audio>

      {!isPlaying ? (
        <button style={{background: 'rgba(98, 129, 65, 0.8)', padding: '10px', borderRadius: '8px', color:'white', border:'none'}} onClick={handlePlay}>Play▶️</button>
      ) : (
        <button style={{background: 'rgba(98, 129, 65, 0.8)', padding: '10px', borderRadius: '8px', color:'white', border:'none'}} onClick={handlePause}>⏸ </button>
      )}
    </div>
  );
}