"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  { name: "New Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
];

export default function LocationMap({selected} : any) {
  // const [selected, setSelected] = useState<Location | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map only once
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    const markerLayer = L.layerGroup().addTo(mapRef.current);

    if (selected) {
      markerLayer.clearLayers();
      L.marker([selected.lat, selected.lng])
        .addTo(markerLayer)
        .bindPopup(selected.name)
        .openPopup();
      mapRef.current.setView([selected.lat, selected.lng], 12);
    }
  }, [selected]);

  return (
    <div className="grid grid-cols-1 h-screen w-full">
      {/* Left - Locations List */}
      {/* <div className="overflow-y-auto p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Locations</h2>
        <ul>
          {locations.map((loc) => (
            <li
              key={loc.name}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded"
              onClick={() => setSelected(loc)}
            >
              {loc.name}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Right - Map */}
      <div id="map" className="w-full h-full"></div>
    </div>
  );
}
