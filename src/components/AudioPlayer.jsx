import { useRef, useState } from 'react';

export default function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔥 TAMBAHAN PENTING
  const stopAllAudio = () => {
    document.querySelectorAll('audio').forEach((audio) => {
      audio.pause();
    });
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      stopAllAudio(); // 🔥 INI KUNCINYA
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{display: 'flex'}}>
  
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)} // 🔥 biar reset
      ></audio>

      <button style={{background: 'rgba(98, 129, 65, 0.3)', padding: '10px', borderRadius: '8px', color:'white', border:'1px solid rgba(98, 129, 65, 0.8)', 'marginBottom': '20px'}} onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Full Audio ▶️'}
      </button>
    </div>
  );
}