import { useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";

export default function DraggablePomodoro() {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        cursor: "grab",
        zIndex: 9999,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <PomodoroTimer />
    </div>
  );
}