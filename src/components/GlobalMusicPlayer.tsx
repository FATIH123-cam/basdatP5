import { useEffect, useRef, useState } from "react";

export default function GlobalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    // Coba autoplay; browser mungkin meminta interaksi pengguna.
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/background.mp3" preload="auto" />

      <div className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 border-2 border-black bg-[#FFE033] p-3 shadow-[4px_4px_0_#000]">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Pause musik" : "Putar musik"}
          className="border-2 border-black bg-white px-3 py-2 font-black"
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-black uppercase">
            Background Music
          </span>
          <input
            aria-label="Volume musik"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
