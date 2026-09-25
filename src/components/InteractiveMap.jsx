import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const STUDIO_MAP_LOCATIONS = {
  main: {
    id: 'main',
    name: 'Mythri Studio (Main Branch)',
    coords: [15.4855, 78.4840],
    tag: 'Official Studio Atelier',
    address: 'Shop No 02, 1st Floor, Nivarthi Bhavan<br/>Opp. National College, Srinivasa Nagar, Nandyal',
    mapsUrl: 'https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5',
    phone: '+91 99493 95037',
    label: 'Main Studio',
  },
  kids: {
    id: 'kids',
    name: "Mythri Kid's Studio",
    coords: [15.455849, 78.478631],
    tag: "Kid's & Baby Shoot Atelier",
    address: 'Bhagatsingh colony, near : Noone palle flyover,<br/>Raithunagar Road, Nandyal',
    mapsUrl: 'https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac',
    phone: '+91 98480 00339',
    label: "Kid's Studio",
  },
};

export default function InteractiveMap({
  activeBranch = 'main',
  branchId, // If passed, locks map focus to this branch
  onBranchChange,
  showBranchSwitcher = false,
  heightClass = 'min-h-[340px] sm:min-h-[380px]',
  initialMapType = 'roadmap',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const markersRef = useRef({});
  const [mapType, setMapType] = useState(initialMapType); // 'roadmap' or 'satellite'

  const targetBranch = branchId || activeBranch || 'main';

  // Tile URLs for official Google Maps layers
  const googleTileUrls = {
    satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', // Google Hybrid Satellite
    roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',   // Google Standard Roadmap
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const currentLoc = STUDIO_MAP_LOCATIONS[targetBranch] || STUDIO_MAP_LOCATIONS.main;

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: currentLoc.coords,
      zoom: 17,
      minZoom: 4,
      maxZoom: 20,
      scrollWheelZoom: false, // safer for page scrolling
      dragging: true,
      touchZoom: true,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Google Tile Layer
    const tileLayer = L.tileLayer(googleTileUrls[mapType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Create 3D pin for both locations
    Object.values(STUDIO_MAP_LOCATIONS).forEach((loc) => {
      const isCurrent = loc.id === currentLoc.id;
      const customIcon = L.divIcon({
        className: 'studio-location-pin',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: ${isCurrent ? '46px' : '38px'}; height: ${isCurrent ? '58px' : '48px'}; cursor: pointer;">
            <div style="position: absolute; bottom: 1px; width: ${isCurrent ? '22px' : '18px'}; height: 8px; background: rgba(0, 0, 0, 0.45); border-radius: 50%; filter: blur(2px);"></div>
            <img src="/pin.png" alt="${loc.name} Location Pin" style="width: ${isCurrent ? '44px' : '36px'}; height: auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.45)); transform: translateY(-2px);" />
          </div>
        `,
        iconSize: isCurrent ? [46, 58] : [38, 48],
        iconAnchor: isCurrent ? [23, 58] : [19, 48],
        popupAnchor: [0, -52],
      });

      const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 2px; min-width: 210px;">
          <div style="display: inline-block; background: #FFF1EE; color: #E15B3E; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; margin-bottom: 4px;">
            ${loc.tag}
          </div>
          <div style="font-weight: 800; font-size: 14px; color: #1E2024; margin-bottom: 3px;">
            ${loc.name}
          </div>
          <div style="font-size: 11px; color: #555555; line-height: 1.4; margin-bottom: 6px;">
            ${loc.address}
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1E2024; margin-bottom: 6px;">
            📞 ${loc.phone}
          </div>
          <a href="${loc.mapsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #E15B3E; text-decoration: none;">
            Open in Google Maps App &rarr;
          </a>
        </div>
      `);

      marker.on('click', () => {
        if (onBranchChange) onBranchChange(loc.id);
      });

      markersRef.current[loc.id] = marker;
    });

    // Automatically open current location popup
    if (markersRef.current[currentLoc.id]) {
      markersRef.current[currentLoc.id].openPopup();
    }

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [targetBranch]);

  // Pan and open popup if targetBranch changes dynamically
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const loc = STUDIO_MAP_LOCATIONS[targetBranch];
    if (loc) {
      mapInstanceRef.current.flyTo(loc.coords, 17, {
        animate: true,
        duration: 1.0,
      });
      if (markersRef.current[loc.id]) {
        setTimeout(() => {
          markersRef.current[loc.id].openPopup();
        }, 500);
      }
    }
  }, [targetBranch]);

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

  const activeLoc = STUDIO_MAP_LOCATIONS[targetBranch] || STUDIO_MAP_LOCATIONS.main;

  return (
    <div className={`relative w-full h-full ${heightClass} overflow-hidden rounded-2xl`}>
      {/* Top Controls Bar: Branch Switcher (optional) & Layer Switcher */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex items-center justify-between gap-2 pointer-events-none">
        {showBranchSwitcher ? (
          <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 border border-[#EAE4D9] shadow-lg">
            {Object.values(STUDIO_MAP_LOCATIONS).map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => onBranchChange && onBranchChange(loc.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  targetBranch === loc.id
                    ? 'bg-[#1E2024] text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE4D9] shadow-md text-[11px] font-bold text-charcoal-800">
            <span>{targetBranch === 'kids' ? '🎈' : '🏛️'}</span>
            <span>{activeLoc.label}</span>
          </div>
        )}

        {/* Map Type Switcher (Roadmap / Satellite) */}
        <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 border border-[#EAE4D9] shadow-lg">
          <button
            type="button"
            onClick={() => switchMapType('roadmap')}
            title="Google Roadmap"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all ${
              mapType === 'roadmap'
                ? 'bg-coral text-white font-bold shadow-xs'
                : 'text-charcoal-600 hover:bg-gray-100'
            }`}
          >
            🗺️
          </button>
          <button
            type="button"
            onClick={() => switchMapType('satellite')}
            title="Google Satellite Hybrid"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all ${
              mapType === 'satellite'
                ? 'bg-coral text-white font-bold shadow-xs'
                : 'text-charcoal-600 hover:bg-gray-100'
            }`}
          >
            🛰️
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ isolation: 'isolate' }}
      />
    </div>
  );
}
