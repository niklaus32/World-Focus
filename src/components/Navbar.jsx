import { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import DraggableWidget from "./DraggableWidget";
import MusicPlayer from "./MusicPlayer";
import Button from "./Button";

function Navbar() {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  return (
    <>
      <nav className="backdrop-blur bg-black/60 border-b border-white/10 text-white shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg select-none">
            <span className="text-3xl font-bold">🌍 World Focus</span>
          </h1>
          <div className="flex items-center gap-4">
            <Button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => setShowMusicPlayer(!showMusicPlayer)}
            >
              Music Player
            </Button>
            <Button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => setShowPomodoro(!showPomodoro)}
            >
              Pomodoro
            </Button>
          </div>
        </div>
      </nav>
      {/* Draggable Music Player (left) */}
      {showMusicPlayer && (
        <DraggableWidget initialPos={{ x: 40, y: 120 }}>
          <MusicPlayer />
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