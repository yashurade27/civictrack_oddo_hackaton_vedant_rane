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

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  onLocationChange: (coords: { latitude: number; longitude: number }) => void;
};

// 🧭 Fix Leaflet icon config
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 📍 Marker + click interaction
function LocationMarker({
  position,
  setPosition,
  onLocationChange,
}: {
  position: { lat: number; lng: number } | null;
  setPosition: (pos: { lat: number; lng: number }) => void;
  onLocationChange: (coords: { latitude: number; longitude: number }) => void;
}) {
  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      onLocationChange({ latitude: coords.lat, longitude: coords.lng });
    },
  });

  return position ? <Marker position={position} draggable={true} /> : null;
}

// 🔍 Clean shadcn-ui styled search bar
function SearchLocationBar({ onSearch }: { onSearch: (lat: number, lng: number) => void }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onSearch(parseFloat(lat), parseFloat(lon));
      } else {
        alert('Location not found.');
      }
    } catch (err) {
      console.error('Location search failed:', err);
      alert('Error occurred during search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex gap-2 items-center">
      <Input
        type="text"
        placeholder="Search location (e.g., Chinchwad)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
}

export default function ReportCreateMap({ onLocationChange }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null); // ✅ proper map instance

  const handleSearchLocation = (lat: number, lng: number) => {
    const newPos = { lat, lng };
    setPosition(newPos);
    onLocationChange({ latitude: lat, longitude: lng });

    if (mapInstance) {
      mapInstance.setView(newPos, 15);
    }
  };

  return (
    <div>
      <SearchLocationBar onSearch={handleSearchLocation} />

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '400px', width: '100%' }}
        whenReady={() => {}}
        ref={(map) => {
          if (map && map instanceof L.Map) setMapInstance(map);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          setPosition={setPosition}
          onLocationChange={onLocationChange}
        />
      </MapContainer>
    </div>
  );
}
