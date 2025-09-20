import Globe from "react-globe.gl";
import { useRef } from "react";

export default function WorldGlobe({ cities, onCityClick }) {
  const globeRef = useRef();

  return (
    <div className="w-full h-[500px]">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" 
        backgroundColor="rgba(0,0,0,0)"
        pointsData={cities}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointLabel={(d) => d.city}
        pointColor={() => "red"}
        pointRadius={0.5}
        onPointClick={(d) => {
          globeRef.current.pointOfView(
            { lat: d.lat, lng: d.lng, altitude: 1.5 },
            2000
          );
          onCityClick(d);
        }}
      />
    </div>
  );
}
