import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { musicOptions } from "../data";

function PomodoroTimer({ pinned, onPin }) {
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  function start() {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(s => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
  }
  function pause() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }
  function reset() {
    setSeconds(1500);
    pause();
  }
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 w-64">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Pomodoro</span>
        <button onClick={onPin} className="text-xs px-2 py-1 bg-green-600 text-white rounded">
          {pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      <div className="text-2xl font-mono mb-2">{min}:{sec.toString().padStart(2, "0")}</div>
      <div className="flex gap-2">
        <button onClick={start} className="px-2 py-1 bg-green-500 text-white rounded">Start</button>
        <button onClick={pause} className="px-2 py-1 bg-yellow-500 text-white rounded">Pause</button>
        <button onClick={reset} className="px-2 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
}

function Navbar() {
  const [music, setMusic] = useState(musicOptions[0].name);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const dragRef = useRef();

  // Drag logic
  function onMouseDown(e) {
    if (pinned) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = pos.x;
    const origY = pos.y;

    function onMouseMove(ev) {
      setPos({
        x: origX + (ev.clientX - startX),
        y: origY + (ev.clientY - startY)
      });
    }
    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return (
    <>
      <nav className="bg-black text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold mb-4">🌍 World Focus App</h1>
          <div className="flex items-center gap-4">
            {/* Music Dropdown */}
            <select
              value={music}
              onChange={e => setMusic(e.target.value)}
              className="bg-white text-black rounded px-2 py-1"
            >
              {musicOptions.map(opt => (
                <option key={opt.name} value={opt.name}>{opt.name}</option>
              ))}
            </select>
            {/* Play selected music (YouTube link opens in new tab) */}
            <a
              href={musicOptions.find(opt => opt.name === music)?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 px-3 py-1 rounded text-white"
            >
              Play
            </a>
            {/* Pomodoro Button */}
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => setShowPomodoro(!showPomodoro)}
            >
              Pomodoro
            </button>
          </div>
        </div>
      </nav>
      {/* Movable Pomodoro Timer */}
      {showPomodoro && (
        <div
          ref={dragRef}
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            zIndex: 1000,
            cursor: pinned ? "default" : "move"
          }}
          onMouseDown={onMouseDown}
        >
          <PomodoroTimer pinned={pinned} onPin={() => setPinned(p => !p)} />
        </div>
      )}
    </>
  );
}

export default Navbar;