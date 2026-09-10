import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Coordinates } from '../../types/travel';

export interface MapMarker {
  id: string;
  title: string;
  category?: string;
  type?: 'attraction' | 'stay' | 'food' | 'transport';
  coordinates: Coordinates;
  description?: string;
}

interface TravelMapProps {
  center: Coordinates;
  zoom?: number;
  markers?: MapMarker[];
  polyline?: Coordinates[];
  height?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

export const TravelMap: React.FC<TravelMapProps> = ({
  center,
  zoom = 12,
  markers = [],
  polyline,
  height = '400px',
  onMarkerClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map instance if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // Use OpenStreetMap tile layer with clean styling
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers & polylines
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add markers
    markers.forEach((m) => {
      let colorClass = 'bg-[#1B4332] text-white';
      if (m.type === 'stay') colorClass = 'bg-blue-700 text-white';
      if (m.type === 'food') colorClass = 'bg-amber-600 text-white';
      if (m.type === 'transport') colorClass = 'bg-emerald-600 text-white';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="${colorClass} px-2 py-1 rounded-md text-[11px] font-bold shadow-md border border-white flex items-center whitespace-nowrap">
                <span>${m.title}</span>
               </div>`,
        iconSize: [100, 30],
        iconAnchor: [50, 15]
      });

      const markerLayer = L.marker([m.coordinates.lat, m.coordinates.lng], { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div style="font-family: system-ui; font-size: 12px; padding: 4px;">
          <strong style="color: #1C1917; font-size: 13px;">${m.title}</strong>
          ${m.category ? `<div style="color: #1B4332; font-weight: 600; margin-top: 2px;">${m.category}</div>` : ''}
          ${m.description ? `<p style="color: #57534E; margin-top: 4px; font-size: 11px;">${m.description}</p>` : ''}
        </div>
      `;
      markerLayer.bindPopup(popupContent);

      if (onMarkerClick) {
        markerLayer.on('click', () => onMarkerClick(m));
      }
    });

    // Add polyline if provided
    if (polyline && polyline.length > 0) {
      const polylineCoords = polyline.map((c) => [c.lat, c.lng] as [number, number]);
      const polylineLayer = L.polyline(polylineCoords, {
        color: '#1B4332',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8
      }).addTo(map);

      map.fitBounds(polylineLayer.getBounds(), { padding: [40, 40] });
    }

    return () => {
      // Map cleanup if component unmounts
    };
  }, [center, zoom, markers, polyline]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#E7E5E4] shadow-xs">
      <div ref={mapContainerRef} style={{ height: height, width: '100%' }} />
      <div className="absolute bottom-2 left-2 z-[400] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-semibold text-[#1C1917] border border-stone-200 shadow-xs flex items-center space-x-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#1B4332]"></span>
        <span>Community Verified Map Pins</span>
      </div>
    </div>
  );
};
