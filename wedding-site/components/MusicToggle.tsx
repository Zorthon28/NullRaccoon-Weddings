'use client'
import { useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      <button onClick={toggle} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
      {playing ? <VolumeX className="w-5 h-5" /> : <Music className="w-5 h-5" />}
    </button>
      <audio ref={audioRef} src="/audio/piano.mp3" loop preload="auto" />
    </div>
  )
}
