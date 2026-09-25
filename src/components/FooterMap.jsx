import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Navigation } from 'lucide-react';

const GOOGLE_TILE_URLS = {
  roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
};

const FOOTER_STUDIO_LOCATIONS = {
  main: {
    id: 'main',
    name: 'Mythri Studio (Main Branch)',
    badge: '1. Main Studio',
    icon: '🏛️',
    coords: [15.4855, 78.4840],
    shortLocation: 'Nivarthi Bhavan, Srinivasa Nagar',
    address: 'Shop No 02, Nivarthi Bhavan<br/>Opp. National College, Srinivasa Nagar, Nandyal',
    mapsUrl: 'https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5',
  },
  kids: {
    id: 'kids',
    name: "Mythri Kid's Studio",
    badge: "2. Kid's Studio",
    icon: '🎈',
    coords: [15.455849, 78.478631],
    shortLocation: 'Bhagatsingh Colony, Noone Palle',
    address: 'Bhagatsingh colony, near Noone palle flyover<br/>Raithunagar Road, Nandyal',
    mapsUrl: 'https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac',
  },
};

function MiniMapCard({ locationData, mapType, onToggleMapType, heightClass = 'h-36 sm:h-40' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  const mapTypeRef = useRef(mapType);
  mapTypeRef.current = mapType;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const map = L.map(mapContainerRef.current, {
      center: locationData.coords,
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

    const tileLayer = L.tileLayer(GOOGLE_TILE_URLS[mapTypeRef.current], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Custom 3D Studio Pin
    const customIcon = L.divIcon({
      className: 'footer-studio-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 34px; height: 44px; cursor: pointer;">
          <div style="position: absolute; bottom: 1px; width: 16px; height: 6px; background: rgba(0, 0, 0, 0.45); border-radius: 50%; filter: blur(2px);"></div>
          <img src="/pin.png" alt="${locationData.name} Pin" style="width: 32px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45)); transform: translateY(-2px);" />
        </div>
      `,
      iconSize: [34, 44],
      iconAnchor: [17, 44],
      popupAnchor: [0, -42],
    });

    const marker = L.marker(locationData.coords, { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 175px;">
        <div style="font-weight: 800; font-size: 13px; color: #1E2024; margin-bottom: 2px;">
          ${locationData.name}
        </div>
        <div style="font-size: 11px; color: #555555; line-height: 1.35; margin-bottom: 6px;">
          ${locationData.address}
        </div>
        <a href="${locationData.mapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 700; color: #E59A3D; text-decoration: none; display: inline-flex; align-items: center; gap: 3px;">
          Open in Google Maps &rarr;
        </a>
      </div>
    `);

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [locationData]);

  // Dynamically update tile layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const newLayer = L.tileLayer(GOOGLE_TILE_URLS[mapType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  }, [mapType]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-white/15 bg-[#14161C] shadow-lg group`}>
      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ isolation: 'isolate' }}
      />

      {/* Top Controls: Location Name Badge + Satellite/Roadmap switch + Open Maps badge */}
      <div className="absolute top-2 left-2 right-2 z-[400] flex items-center justify-between pointer-events-none gap-1">
        <div className="pointer-events-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white shadow-sm">
          <span>{locationData.icon}</span>
          <span className="truncate max-w-[110px] sm:max-w-[130px]">{locationData.badge}</span>
        </div>

        <div className="flex items-center gap-1 pointer-events-auto">
          {/* Map Layer Switcher */}
          <button
            type="button"
            onClick={onToggleMapType}
            title={mapType === 'roadmap' ? 'Switch to Satellite View' : 'Switch to Roadmap View'}
            className="w-6 h-6 rounded-full bg-black/80 hover:bg-[#E59A3D] hover:text-black text-white text-[11px] flex items-center justify-center backdrop-blur-md border border-white/15 transition-all shadow-sm cursor-pointer"
          >
            {mapType === 'roadmap' ? '🛰️' : '🗺️'}
          </button>

          {/* Open in Google Maps */}
          <a
            href={locationData.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps App"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 hover:bg-[#E59A3D] hover:text-black text-white text-[10px] font-bold backdrop-blur-md border border-white/15 transition-all shadow-sm active:scale-95"
          >
            <span>Maps</span>
            <ExternalLink size={9} />
          </a>
        </div>
      </div>

      {/* Bottom Location Label Bar */}
      <a
        href={locationData.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Get directions to ${locationData.name}`}
        className="absolute bottom-2 left-2 right-2 z-[400] py-1 px-2 rounded-xl bg-black/85 hover:bg-black/95 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10px] font-semibold text-white transition-all shadow-sm group-hover:border-[#E59A3D]/40"
      >
        <span className="truncate flex items-center gap-1">
          <Navigation size={10} className="text-[#E59A3D] shrink-0" />
          <span className="truncate">{locationData.shortLocation}</span>
        </span>
        <span className="text-[#E59A3D] font-bold text-[9px] shrink-0 ml-1">Open ↗</span>
      </a>
    </div>
  );
}

export default function FooterMap() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'main', or 'kids'
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' or 'satellite'

  const toggleMapType = () => {
    setMapType((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'));
  };

  return (
    <div className="space-y-3">
      {/* Branch View Selector Pill Bar */}
      <div className="flex items-center justify-between gap-1 p-1 bg-white/5 rounded-xl border border-white/10 text-[10px]">
        <button
          type="button"
          onClick={() => setViewMode('both')}
          className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all text-center ${
            viewMode === 'both'
              ? 'bg-[#E59A3D] text-black shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🗺️ 2 Maps (Both)
        </button>
        <button
          type="button"
          onClick={() => setViewMode('main')}
          className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all text-center ${
            viewMode === 'main'
              ? 'bg-[#E59A3D] text-black shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🏛️ Main
        </button>
        <button
          type="button"
          onClick={() => setViewMode('kids')}
          className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all text-center ${
            viewMode === 'kids'
              ? 'bg-[#E59A3D] text-black shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🎈 Kid's
        </button>
      </div>

      {/* Map Displays */}
      {viewMode === 'both' ? (
        <div className="space-y-2.5">
          {/* Map 1: Main Studio */}
          <MiniMapCard
            locationData={FOOTER_STUDIO_LOCATIONS.main}
            mapType={mapType}
            onToggleMapType={toggleMapType}
            heightClass="h-32 sm:h-36"
          />

          {/* Map 2: Kid's Studio */}
          <MiniMapCard
            locationData={FOOTER_STUDIO_LOCATIONS.kids}
            mapType={mapType}
            onToggleMapType={toggleMapType}
            heightClass="h-32 sm:h-36"
          />
        </div>
      ) : (
        /* Single Branch View */
        <MiniMapCard
          locationData={FOOTER_STUDIO_LOCATIONS[viewMode]}
          mapType={mapType}
          onToggleMapType={toggleMapType}
          heightClass="h-52 sm:h-56"
        />
      )}
    </div>
  );
}
