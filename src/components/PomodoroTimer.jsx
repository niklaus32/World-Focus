import { useState, useRef } from "react";

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

export default PomodoroTimer;