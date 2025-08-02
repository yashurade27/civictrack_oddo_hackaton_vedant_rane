'use client';

import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type Props = {
  onLocationChange: (coords: { latitude: number; longitude: number }) => void;
};


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle marker and map click
function LocationMarker({ onLocationChange }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      onLocationChange({ latitude: coords.lat, longitude: coords.lng });
    },
  });

  return position ? <Marker position={position} draggable={true} /> : null;
}

export default function ReportCreateMap({ onLocationChange }: Props) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India default center
      zoom={5}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationChange={onLocationChange} />
    </MapContainer>
  );
}
