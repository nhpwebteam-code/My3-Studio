import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Navigation } from 'lucide-react';

// Nivarthi Bhavan, Opp. National College, Srinivasa Nagar, Nandyal coordinates
const STUDIO_COORDS = [15.4855, 78.4840];

const GOOGLE_TILE_URLS = {
  roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
};

export default function FooterMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' or 'satellite'

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Safety clear in React StrictMode
    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    // Initialize compact Leaflet map with real Google tiles
    const map = L.map(mapContainerRef.current, {
      center: STUDIO_COORDS,
      zoom: 16,
      minZoom: 4,
      maxZoom: 20,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    mapInstanceRef.current = map;

    // Add Google Roadmap Tiles
    const tileLayer = L.tileLayer(GOOGLE_TILE_URLS.roadmap, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Custom 3D Studio Pin
    const customIcon = L.divIcon({
      className: 'footer-studio-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 36px; height: 46px; cursor: pointer;">
          <div style="position: absolute; bottom: 1px; width: 18px; height: 6px; background: rgba(0, 0, 0, 0.45); border-radius: 50%; filter: blur(2px);"></div>
          <img src="/pin.png" alt="MY3 Studio Pin" style="width: 34px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); transform: translateY(-2px);" />
        </div>
      `,
      iconSize: [36, 46],
      iconAnchor: [18, 46],
      popupAnchor: [0, -44],
    });

    const marker = L.marker(STUDIO_COORDS, { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 175px;">
        <div style="font-weight: 800; font-size: 13px; color: #1E2024; margin-bottom: 2px;">
          MY3 Studio Nandyal
        </div>
        <div style="font-size: 11px; color: #555555; line-height: 1.35; margin-bottom: 6px;">
          Shop No 02, Nivarthi Bhavan<br/>
          Opp. National College, Srinivasa Nagar
        </div>
        <a href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 700; color: #E15B3E; text-decoration: none; display: inline-flex; align-items: center; gap: 3px;">
          Open in Google Maps &rarr;
        </a>
      </div>
    `);

    // Invalidate size once rendered to ensure proper tiling
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const switchMapType = (newType) => {
    setMapType(newType);
    if (!mapInstanceRef.current) return;

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(googleTileUrls[newType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(mapInstanceRef.current);

    currentTileLayerRef.current = newTileLayer;
  };

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-white/15 bg-[#14161C] shadow-lg group">
      {/* Real Interactive Google Maps Leaflet Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ isolation: 'isolate' }}
      />

      {/* Top Map Switcher & Open Maps Badge */}
      <div className="absolute top-2 left-2 right-2 z-[400] flex items-center justify-between pointer-events-none">
        {/* Map Type Switcher */}
        <div className="pointer-events-auto flex items-center bg-black/80 backdrop-blur-md rounded-full p-0.5 border border-white/15 shadow-md">
          <button
            type="button"
            onClick={() => switchMapType('roadmap')}
            title="Google Roadmap"
            className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition-all ${
              mapType === 'roadmap'
                ? 'bg-coral text-white font-bold shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            🗺️
          </button>
          <button
            type="button"
            onClick={() => switchMapType('satellite')}
            title="Google Satellite"
            className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition-all ${
              mapType === 'satellite'
                ? 'bg-coral text-white font-bold shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            🛰️
          </button>
        </div>

        {/* Top-Right "Open Maps" badge */}
        <a
          href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Google Maps App"
          className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 hover:bg-coral text-white text-[10px] font-bold backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span>Open Maps</span>
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Bottom Location Label Bar */}
      <a
        href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
        target="_blank"
        rel="noopener noreferrer"
        title="Get directions to Mythri Studios"
        className="absolute bottom-2 left-2 right-2 z-[400] py-1.5 px-2.5 rounded-xl bg-black/85 hover:bg-black/95 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px] font-semibold text-white transition-all shadow-md group-hover:border-coral/40"
      >
        <span className="truncate flex items-center gap-1">
          <Navigation size={11} className="text-coral shrink-0" />
          <span className="truncate">Nivarthi Bhavan, Srinivasa Nagar</span>
        </span>
        <span className="text-coral font-bold text-[10px] shrink-0 ml-1.5">MY3 Studios</span>
      </a>
    </div>
  );
}
