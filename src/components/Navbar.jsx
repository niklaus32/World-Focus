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
      <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">🌍 World Focus</h1>
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