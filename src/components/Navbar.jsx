import { useState } from "react";
import { musicOptions } from "../data";
import PomodoroTimer from "./PomodoroTimer";
import DraggableWidget from "./DraggableWidget";

function MusicPlayer({ music }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 w-64">
      <div className="font-bold mb-2">Music Player</div>
      <div className="mb-2">{music.name}</div>
      <a
        href={music.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 px-3 py-1 rounded text-white"
      >
        Play
      </a>
    </div>
  );
}

function Navbar() {
  const [music, setMusic] = useState(musicOptions[0]);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  return (
    <>
      <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">🌍 World Focus App</h1>
          <div className="flex items-center gap-4">
            <select
              value={music.name}
              onChange={e => setMusic(musicOptions.find(opt => opt.name === e.target.value))}
              className="bg-white text-black rounded px-2 py-1"
            >
              {musicOptions.map(opt => (
                <option key={opt.name} value={opt.name}>{opt.name}</option>
              ))}
            </select>
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => setShowMusicPlayer(!showMusicPlayer)}
            >
              Music Player
            </button>
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => setShowPomodoro(!showPomodoro)}
            >
              Pomodoro
            </button>
          </div>
        </div>
      </nav>
      {/* Draggable Music Player (left) */}
      {showMusicPlayer && (
        <DraggableWidget initialPos={{ x: 40, y: 120 }}>
          <MusicPlayer music={music} />
        </DraggableWidget>
      )}
      {/* Draggable Pomodoro Timer (right) */}
      {showPomodoro && (
        <DraggableWidget initialPos={{ x: window.innerWidth - 350, y: 120 }}>
          <PomodoroTimer />
        </DraggableWidget>
      )}
    </>
  );
}

export default Navbar;