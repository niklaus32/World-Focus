import { useState } from "react";

export default function DraggableWidget({ children, initialPos = { x: 100, y: 100 }, visible = true, onClose }) {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false); // track hover

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
    e.preventDefault(); // prevent text selection
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      const el = e.currentTarget;
      const maxX = window.innerWidth - el.offsetWidth;
      const maxY = window.innerHeight - el.offsetHeight;

      const boundedX = Math.min(Math.max(0, newX), maxX);
      const boundedY = Math.min(Math.max(0, newY), maxY);

      setPos({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        width: "fit-content",
        display: visible ? "block" : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Bar, only visible on hover */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          width: "100%",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          padding: "4px 8px",
          opacity: hovered ? 1 : 0,           // show/hide
          transition: "opacity 0.2s ease-in-out", // smooth fade
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            cursor: "grab",
            textAlign: "center",
            flex: 1,
          }}
        >
          • • •
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              padding: "2px 4px",
              borderRadius: "3px",
            }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Hide widget"
          >
            ×
          </button>
        )}
      </div>

      {/* Widget content */}
      <div>
        {children}
      </div>
    </div>
  );
}
