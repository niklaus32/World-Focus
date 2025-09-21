import { useState } from "react";
import WorldGlobe from "./pages/WorldGlobe";
import DraggablePomodoro from "./components/DraggablePomodoro";
import Navbar from "./components/Navbar";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    {
      city: "Paris",
      lat: 48.8566,
      lng: 2.3522,
      video: "https://www.youtube.com/embed/VIDEO_ID1"
    },
    {
      city: "Tokyo",
      lat: 35.6895,
      lng: 139.6917,
      video: "https://www.youtube.com/embed/VIDEO_ID2"
    },
    {
      city: "New York",
      lat: 40.7128,
      lng: -74.006,
      video: "https://www.youtube.com/embed/VIDEO_ID3"
    },
    {
      city: "Auckland",
      lat: -36.8485,
      lng: 174.7633,
      video: "https://www.youtube.com/embed/VIDEO_ID4"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">🌍 World Focus App</h1>
      <DraggablePomodoro />
      <WorldGlobe cities={cities} onCityClick={setSelectedCity} />

      {/* Fullscreen video overlay */}
      {selectedCity && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              className="w-[90%] h-[90%] rounded-lg shadow-xl"
              src={selectedCity.video + "?autoplay=1"}
              title={selectedCity.city}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
              onClick={() => setSelectedCity(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}