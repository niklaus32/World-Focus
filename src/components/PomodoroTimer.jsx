import { useEffect, useMemo, useRef, useState } from "react";

/** Small helper */
const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const DEFAULTS = {
  work: 25,       // minutes
  short: 5,       // minutes
  long: 15,       // minutes
  roundsUntilLong: 4, // long break after N work sessions
};

export default function PomodoroTimer() {
  // durations in minutes
  const [dur, setDur] = useState(DEFAULTS);
  // mode: "work" | "short" | "long"
  const [mode, setMode] = useState("work");
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(0); // completed work sessions in current set
  const [totalPomodoros, setTotalPomodoros] = useState(0); // total completed work sessions
  const [showSettings, setShowSettings] = useState(false);

  // seconds for current mode
  const modeSeconds = useMemo(() => {
    const m =
      mode === "work" ? dur.work :
      mode === "short" ? dur.short : dur.long;
    return m * 60;
  }, [mode, dur]);

  const [secondsLeft, setSecondsLeft] = useState(modeSeconds);

  // keep most up-to-date values in refs for interval
  const runningRef = useRef(isRunning);
  const secondsRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const completedRef = useRef(completed);

  useEffect(() => { runningRef.current = isRunning; }, [isRunning]);
  useEffect(() => { secondsRef.current = secondsLeft; }, [secondsLeft]);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { completedRef.current = completed; }, [completed]);

  // Reset seconds when switching modes or changing durations
  useEffect(() => {
    setSecondsLeft(modeSeconds);
  }, [modeSeconds]);

  // Ask for notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Ticking interval
  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current) return;
      if (secondsRef.current <= 0) {
        // time up -> switch
        handleSessionEnd();
      } else {
        setSecondsLeft((s) => s - 1);
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSessionEnd = () => {
    // sound (tiny beep)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = modeRef.current === "work" ? 880 : 660;
      o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      o.start(); o.stop(ctx.currentTime + 0.32);
    } catch {}

    // notification
    if ("Notification" in window && Notification.permission === "granted") {
      const title =
        modeRef.current === "work" ? "Work session done!" : "Break finished!";
      const body =
        modeRef.current === "work"
          ? "Time for a break."
          : "Back to focus time.";
      new Notification(title, { body });
    }

    // compute next mode
    if (modeRef.current === "work") {
      setTotalPomodoros((n) => n + 1);
      const newCompleted = completedRef.current + 1;
      setCompleted(newCompleted);

      if (newCompleted >= dur.roundsUntilLong) {
        setMode("long");
        setCompleted(0); // reset the set
      } else {
        setMode("short");
      }
    } else {
      setMode("work");
    }
  };

  const handleStartPause = () => setIsRunning((r) => !r);

  const handleReset = () => {
    setIsRunning(false);
    setMode("work");
    setCompleted(0);
    setSecondsLeft(dur.work * 60);
  };

  const handleSkip = () => {
    // Skip current session immediately
    setSecondsLeft(0);
  };

  const handleDurChange = (field, val) => {
    const v = Math.max(1, Math.min(180, Number(val) || 0)); // clamp 1..180
    setDur((d) => ({ ...d, [field]: v }));
  };

  const percent = 100 * (1 - secondsLeft / modeSeconds);
  const label =
    mode === "work" ? "Focus" : mode === "short" ? "Short Break" : "Long Break";

  return (
    <div className="w-[320px] bg-white/10 backdrop-blur rounded-xl border border-white/15 p-4 mx-auto text-white shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-1">Pomodoro Timer</h2>
      <p className="text-xs text-gray-300 mb-3">
        {label} • {completed}/{dur.roundsUntilLong} before long break
      </p>

      {/* Progress ring */}
      <div className="relative w-40 h-40 mx-auto my-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50" cy="50" r="45"
            stroke="currentColor"
            className={
              mode === "work" ? "text-rose-500" :
              mode === "short" ? "text-emerald-500" : "text-cyan-500"
            }
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${Math.max(0, (percent/100)*2*Math.PI*45)} ${2*Math.PI*45}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-4xl font-mono tabular-nums text-white">
              {formatTime(secondsLeft)}
            </div>
            <div className="text-[10px] text-gray-300 mt-1 uppercase tracking-wide">
              {label}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <button
          onClick={handleStartPause}
          className={`px-3 py-2 rounded-md text-white ${
            isRunning ? "bg-slate-700 hover:bg-slate-800" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
          title="Reset progress"
        >
          Reset
        </button>
        <button
          onClick={handleSkip}
          className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
          title="Skip current session"
        >
          Skip
        </button>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="px-2.5 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Quick mode switch */}
      <div className="flex justify-center gap-2 mt-4">
        {["work", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setIsRunning(false); }}
            className={`text-sm px-3 py-1 rounded-full border ${
              mode === m
                ? "bg-white/90 text-black border-white/90"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            {m === "work" ? "Focus" : m === "short" ? "Short" : "Long"}
          </button>
        ))}
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="mt-5 border-t pt-4">
          <h3 className="text-sm font-semibold text-white mb-3">Durations (minutes)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-gray-200">
              Work
              <input
                type="number"
                className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-white/40"
                value={dur.work}
                onChange={(e) => handleDurChange("work", e.target.value)}
                min={1} max={180}
              />
            </label>
            <label className="text-sm text-gray-200">
              Short break
              <input
                type="number"
                className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-white/40"
                value={dur.short}
                onChange={(e) => handleDurChange("short", e.target.value)}
                min={1} max={60}
              />
            </label>
            <label className="text-sm text-gray-200">
              Long break
              <input
                type="number"
                className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-white/40"
                value={dur.long}
                onChange={(e) => handleDurChange("long", e.target.value)}
                min={1} max={120}
              />
            </label>
            <label className="text-sm text-gray-200">
              Rounds until long
              <input
                type="number"
                className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-white/40"
                value={dur.roundsUntilLong}
                onChange={(e) => handleDurChange("roundsUntilLong", e.target.value)}
                min={1} max={12}
              />
            </label>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 text-xs text-gray-300">
        Total pomodoros: <span className="font-semibold text-white">{totalPomodoros}</span>
      </div>
    </div>
  );
}