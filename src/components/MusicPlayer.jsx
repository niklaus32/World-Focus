import { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
  const tracks = [
    { name: "Lofi Hip Hop Radio", src: "https://www.youtubeinmp3.com/fetch/?video=jfKfPfyJRdk" },
    { name: "Classical Music", src: "https://www.youtubeinmp3.com/fetch/?video=0UN_HbOTTcI" },
    { name: "White Noise", src: "https://www.youtubeinmp3.com/fetch/?video=nMfPqeZjc2c" },
    { name: "Brown Noise", src: "https://www.youtubeinmp3.com/fetch/?video=RqzGzwTY-6w" },
  ];

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [scale, setScale] = useState(1);

  const minScale = 1;
  const maxScale = 1.66;

  const audioRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const playRandom = () => {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(randomTrack);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play().catch(() => {}), 0);
  };

  const toggleMute = () => setMuted((m) => !m);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted, currentTrack]);

  useEffect(() => {
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentTrack]);

  return (
    <div
      className="bg-white/10 backdrop-blur rounded-xl border border-white/15 p-4 text-white shadow-xl"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: "220px",
      }}
    >
      {/* Line 1: Title + Zoom */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-white">Music Player</h2>
        <div className="flex gap-1">
          <button
            onClick={() => setScale(prev => Math.min(maxScale, prev + 0.1))}
            className="px-2 py-1 bg-transparent hover:bg-white/10 rounded text-white"
          >
            +
          </button>
          <button
            onClick={() => setScale(prev => Math.max(minScale, prev - 0.1))}
            className="px-2 py-1 bg-transparent hover:bg-white/10 rounded text-white"
          >
            -
          </button>
        </div>
      </div>

      {/* Line 2: Track selector */}
      <div className="mb-3">
        <select
          value={currentTrack.name}
          onChange={(e) => {
            const selected = tracks.find((t) => t.name === e.target.value);
            setCurrentTrack(selected);
            setIsPlaying(false);
          }}
          className="w-full text-white px-2 py-1 rounded"
        >
          {tracks.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Line 3: Volume slider */}
      <div className="flex items-center gap-2 mb-3">
        <button onClick={toggleMute} className="text-white text-lg">
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-3/4"
          style={{
            accentColor: muted ? "#555" : "#4f46e5",
          }}
        />
      </div>

      {/* Line 4: Play / Random buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={togglePlay}
          className={`px-3 py-2 rounded-md text-white ${
            isPlaying ? "bg-slate-700 hover:bg-slate-800" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={playRandom}
          className="px-3 py-2 rounded-md bg-indigo-800 hover:bg-indigo-900 text-white"
        >
          Random
        </button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={currentTrack.src} />
    </div>
  );
}
