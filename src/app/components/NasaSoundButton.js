"use client";

import { useRef, useState } from "react";

export default function NasaSoundButton({ sound }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!sound) return null;

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="mt-5 max-w-xl rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-[0_0_24px_rgba(96,165,250,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{sound.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{sound.note}</p>
          <a href={sound.source} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-slate-500 transition hover:text-slate-300">
            NASA source
          </a>
        </div>
        <button
          type="button"
          onClick={toggleAudio}
          className="space-button shrink-0 px-5 py-2 text-sm"
          aria-label={`${isPlaying ? "Pause" : "Play"} ${sound.title}`}
        >
          {isPlaying ? "Pause sound" : "Play sound"}
        </button>
      </div>
      <audio ref={audioRef} preload="none" onEnded={() => setIsPlaying(false)}>
        <source src={sound.src} type={sound.type} />
      </audio>
    </div>
  );
}
