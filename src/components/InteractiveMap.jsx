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

    // Custom glowing Studio Pin
    const customIcon = L.divIcon({
      className: 'studio-google-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 46px; height: 46px; background: rgba(225, 91, 62, 0.35); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 38px; height: 38px; background: #E15B3E; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 4px 16px rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 16px;">
            📸
          </div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -22],
    });

    const marker = L.marker(studioCoords, { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 200px;">
        <div style="display: inline-block; background: #FFF1EE; color: #E15B3E; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; margin-bottom: 4px;">
          Official Studio Atelier
        </div>
        <div style="font-weight: 800; font-size: 14px; color: #1E2024; margin-bottom: 2px;">
          Mythri Studio Nandyal
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
      {/* Map Switcher Pill (Top-Right) */}
      <div className="absolute top-4 right-4 z-[400] flex items-center bg-white/90 backdrop-blur-md rounded-full p-1 border border-[#EAE4D9] shadow-md">
        <button
          type="button"
          onClick={() => switchMapType('satellite')}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
            mapType === 'satellite'
              ? 'bg-coral text-white shadow-sm'
              : 'text-charcoal-700 hover:text-charcoal-900'
          }`}
        >
          🛰️ Satellite
        </button>
        <button
          type="button"
          onClick={() => switchMapType('roadmap')}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
            mapType === 'roadmap'
              ? 'bg-coral text-white shadow-sm'
              : 'text-charcoal-700 hover:text-charcoal-900'
          }`}
        >
          🗺️ Map
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
