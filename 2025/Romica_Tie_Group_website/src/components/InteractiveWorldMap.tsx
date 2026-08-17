import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

// Using the official world-atlas CDN URL for TopoJSON data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// The InteractiveWorldMap component, now accepting 'locations' as a prop.
export default function InteractiveWorldMap({ locations }) {
  // State for managing the tooltip content that appears on hover.
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  // State for controlling the visibility and content of the modal.
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Function to handle a click on a map marker.
  const handleMarkerClick = (location) => {
    setModalData(location);
    setShowModal(true);
  };

  // Function to close the modal.
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  // Handle marker hover for custom tooltip
  const handleMarkerHover = (location, event) => {
    setTooltipContent(location.name);
    setTooltipPosition({
      x: event.clientX + 10,
      y: event.clientY - 10
    });
    setShowTooltip(true);
  };

  const handleMarkerLeave = () => {
    setShowTooltip(false);
    setTooltipContent('');
  };
  
  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projectionConfig={{
          scale: 175,
          rotate: [-10, 0, 0],
        }}
        style={{ width: '100%', height: '100%' }}
        className="bg-slate-900 rounded-2xl"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={0.5}
                className="hover:fill-slate-700 transition-colors duration-200"
              />
            ))
          }
        </Geographies>
        
        {locations.map((location) => (
          <Marker 
            key={location.name} 
            coordinates={location.coordinates}
            onClick={() => handleMarkerClick(location)}
            onMouseEnter={(e) => handleMarkerHover(location, e)}
            onMouseLeave={handleMarkerLeave}
          >
            {/* Pulsing ring */}
            <circle 
              r={20} 
              fill="none"
              stroke="#38bdf8"
              strokeWidth={2}
              opacity={0.3}
              className="animate-ping"
            />
            {/* Main marker */}
            <circle 
              r={8} 
              fill="#38bdf8"
              stroke="#0f172a" 
              strokeWidth={2}
              className="cursor-pointer transition-all duration-200 hover:scale-125 hover:fill-cyan-400"
            />
            {/* Location label */}
            <text
              textAnchor="middle"
              y={-15}
              className="fill-white text-xs font-semibold pointer-events-none"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              {location.name.split(' ')[0]}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Custom tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg pointer-events-none border border-slate-600"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {tooltipContent}
        </div>
      )}

      {/* The modal component, which is conditionally rendered. */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-700">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
              {modalData.name}
            </h2>
            <p className="text-slate-300 mb-4">{modalData.description}</p>
            <div className="text-blue-400 font-semibold mb-6">{modalData.stats}</div>
            <button
              onClick={closeModal}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}