import Globe from "react-globe.gl";
import { useRef } from "react";

export default function WorldGlobe({ cities, onCityClick }) {
  const globeRef = useRef();

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  return (
    <div className="w-full h-[500px]">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        htmlElementsData={cities}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML = markerSvg;
          el.style.color = d.color || "red";
          el.style.width = `${d.size || 20}px`;
          el.style.transition = "opacity 250ms";
          el.style.pointerEvents = "auto";
          el.style.cursor = "pointer";
          el.style.position = "relative"; 

          const tooltip = document.createElement("div");
          tooltip.innerText = d.city;
          tooltip.style.position = "absolute";
          tooltip.style.bottom = "120%";
          tooltip.style.left = "50%";
          tooltip.style.transform = "translateX(-50%)";
          tooltip.style.padding = "2px 6px";
          tooltip.style.backgroundColor = "rgba(0,0,0,0.7)";
          tooltip.style.color = "white";
          tooltip.style.borderRadius = "4px";
          tooltip.style.fontSize = "12px";
          tooltip.style.whiteSpace = "nowrap";
          tooltip.style.pointerEvents = "none";
          tooltip.style.opacity = "0";
          tooltip.style.transition = "opacity 150ms";
          el.appendChild(tooltip);

          el.onmouseenter = () => {
            tooltip.style.opacity = "1";
          };
          el.onmouseleave = () => {
            tooltip.style.opacity = "0";
          };

          el.onclick = () => {
            onCityClick(d);
          };

          return el;
        }}
        htmlElementVisibilityModifier={(el, isVisible) =>
          (el.style.opacity = isVisible ? 1 : 0)
        }
      />
    </div>
  );
}
