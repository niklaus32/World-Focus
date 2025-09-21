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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all duration-200 border border-white/10"
              onClick={() => setShowMusicPlayer(!showMusicPlayer)}
            >
              Music Player
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-all duration-200 border border-white/10"
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