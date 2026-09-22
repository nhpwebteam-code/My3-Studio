import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const [mapType, setMapType] = useState('satellite'); // 'satellite' (Google Hybrid) or 'roadmap' (Google Standard)

  // Nivarthi Bhavan, Opp. National College, Srinivasa Nagar, Nandyal coordinates
  const studioCoords = [15.4855, 78.4840];

  // Tile URLs for official Google Maps layers
  const googleTileUrls = {
    satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', // Google Hybrid Satellite (imagery + roads & labels)
    roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',   // Google Standard Roadmap
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet map with direct mouse wheel scroll zoom (no ctrl required!)
    const map = L.map(mapContainerRef.current, {
      center: studioCoords,
      zoom: 17,
      minZoom: 4,
      maxZoom: 20,
      scrollWheelZoom: true,
      dragging: true,
      zoomControl: false, // We'll add custom positioned zoom control
    });

    mapInstanceRef.current = map;

    // Add zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Google Hybrid Satellite Tile Layer
    const tileLayer = L.tileLayer(googleTileUrls[mapType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Exact 3D Red Location Pin from user's uploaded image
    const customIcon = L.divIcon({
      className: 'studio-location-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 44px; height: 58px; cursor: pointer;">
          <div style="position: absolute; bottom: 1px; width: 20px; height: 8px; background: rgba(0, 0, 0, 0.4); border-radius: 50%; filter: blur(2px);"></div>
          <img src="/pin.png" alt="Mythri Studios Location Pin" style="width: 42px; height: auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4)); transform: translateY(-2px);" />
        </div>
      `,
      iconSize: [44, 58],
      iconAnchor: [22, 58],
      popupAnchor: [0, -56],
    });

    const marker = L.marker(studioCoords, { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 200px;">
        <div style="display: inline-block; background: #FFF1EE; color: #E15B3E; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; margin-bottom: 4px;">
          Official Studios Atelier
        </div>
        <div style="font-weight: 800; font-size: 14px; color: #1E2024; margin-bottom: 2px;">
          Mythri Studios Nandyal
        </div>
        <div style="font-size: 11px; color: #555555; line-height: 1.4; margin-bottom: 8px;">
          Shop No 02, 1st Floor, Nivarthi Bhavan<br/>
          Opp. National College, Srinivasa Nagar
        </div>
        <a href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #E15B3E; text-decoration: none;">
          Open in Google Maps App &rarr;
        </a>
      </div>
    `);

    // Invalidate size on load and resize
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle switching between Satellite and Roadmap dynamically
  const switchMapType = (newType) => {
    setMapType(newType);
    if (!mapInstanceRef.current) return;

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(googleTileUrls[newType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    }).addTo(mapInstanceRef.current);

    currentTileLayerRef.current = newTileLayer;
  };

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px]">
      {/* Map Switcher Pill (Top-Right) - Emojis only matching user drawing */}
      <div className="absolute top-3 right-3 z-[400] flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 border border-[#EAE4D9] shadow-lg">
        <button
          type="button"
          onClick={() => switchMapType('satellite')}
          title="Google Satellite View"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all ${
            mapType === 'satellite'
              ? 'bg-coral text-white shadow-sm scale-105'
              : 'text-charcoal-600 hover:bg-gray-100'
          }`}
        >
          🛰️
        </button>
        <button
          type="button"
          onClick={() => switchMapType('roadmap')}
          title="Google Standard Map"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all ${
            mapType === 'roadmap'
              ? 'bg-coral text-white shadow-sm scale-105'
              : 'text-charcoal-600 hover:bg-gray-100'
          }`}
        >
          🗺️
        </button>
      </div>

      {/* Actual Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[380px] lg:min-h-[480px] z-0"
        style={{ isolation: 'isolate' }}
      />
    </div>
  );
}
