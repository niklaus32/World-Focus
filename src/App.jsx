import { useState, useEffect } from "react";
import WorldGlobe from "./pages/WorldGlobe";
import Navbar from "./components/Navbar";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showBackButton, setShowBackButton] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);

  const cities = [
    {
      city: "Paris",
      lat: 48.8566,
      lng: 2.3522,
      video: "/Paris.webm"
    },
    {
      city: "Tokyo",
      lat: 35.6895,
      lng: 139.6917,
      video: "/Tokyo.webm"
    },
    {
      city: "New York",
      lat: 40.7128,
      lng: -74.006,
      video: "/newyork.webm"
    },
    {
      city: "Auckland",
      lat: -36.8485,
      lng: 174.7633,
      video: ""
    },
    {
      city: "London",
      lat: 51.5074,
      lng: -0.1278,
      video: "https://www.w3schools.com/html/mov_bbb.mp4" // placeholder
    },
    {
      city: "Sydney",
      lat: -33.8688,
      lng: 151.2093,
      video: "https://www.w3schools.com/html/movie.mp4" // placeholder
    },
    {
      city: "Rio de Janeiro",
      lat: -22.9068,
      lng: -43.1729,
      video: "https://www.w3schools.com/html/mov_bbb.mp4" // placeholder
    },
    {
      city: "Cairo",
      lat: 30.0444,
      lng: 31.2357,
      video: "https://www.w3schools.com/html/movie.mp4" // placeholder
    },
    {
      city: "Los Angeles",
      lat: 34.0522,
      lng: -118.2437,
      video: "https://www.w3schools.com/html/mov_bbb.mp4" // placeholder
    },
    {
      city: "Cape Town",
      lat: -33.9249,
      lng: 18.4241,
      video: "https://www.w3schools.com/html/movie.mp4" // placeholder
    },
    {
      city: "Moscow",
      lat: 55.7558,
      lng: 37.6173,
      video: "https://www.w3schools.com/html/mov_bbb.mp4" // placeholder
    },
    {
      city: "Beijing",
      lat: 39.9042,
      lng: 116.4074,
      video: "https://www.w3schools.com/html/movie.mp4" // placeholder
    }
  ];

  useEffect(() => {
    if (!selectedCity) return;

    let timer;
    const handleMouseMove = () => {
      setShowBackButton(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowBackButton(false), 2000); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [selectedCity]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white" style={{ overflow: "hidden" }}>
      {selectedCity && showBackButton && (
        <button
          onClick={() => setShowNavbar((prev) => !prev)}
          className="fixed top-4 right-4 z-[100] bg-white/20 text-white px-3 py-2 rounded shadow hover:bg-white/40 transition"
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
      )}
      {!selectedCity && (
        <button
          onClick={() => setShowNavbar((prev) => !prev)}
          className="fixed top-4 right-4 z-[100] bg-white/20 text-white px-3 py-2 rounded shadow hover:bg-white/40 transition"
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
      )}

      {showNavbar && <Navbar />}

      <div style={{ paddingTop: showNavbar ? "72px" : 0, height: "100vh", overflow: "hidden" }}>
        <WorldGlobe cities={cities} onCityClick={setSelectedCity} />

        {/* Fullscreen video overlay */}
        {selectedCity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            <video
              src={selectedCity.video}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}
            />

            {showNavbar && <div className="fixed top-0 left-0 w-full z-[100] pointer-events-auto"><Navbar /></div>}

            {showBackButton && (
              <button
                onClick={() => setSelectedCity(null)}
                className={
                  `fixed left-6 text-white text-2xl font-bold px-5 py-2 rounded-xl shadow-lg transition-all duration-200 z-[101] ` +
                  (showNavbar
                    ? 'top-24 backdrop-blur bg-black/60 border border-white/10 hover:bg-black/80'
                    : 'top-6 backdrop-blur bg-black/60 border border-white/10 hover:bg-black/80')
                }
              >
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}