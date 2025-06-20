import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Try to autoplay when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked, stay paused until user toggles
      });
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={toggle}
        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? <VolumeX className="w-5 h-5" /> : <Music className="w-5 h-5" />}
      </button>
      <audio ref={audioRef} src="/audio/piano.mp3" loop preload="auto" />
    </div>
  );
}
