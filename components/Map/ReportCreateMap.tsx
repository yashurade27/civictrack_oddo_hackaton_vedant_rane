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
  onLocationChange: (data: {
    latitude: number;
    longitude: number;
    locationName: string;
  }) => void;
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
  onLocationChange: (coords: {
    latitude: number;
    longitude: number;
    locationName: string;
  }) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const coords = e.latlng;
      setPosition(coords);

      // 🔄 Reverse geocode to get location name
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
        );
        const data = await res.json();
        const locationName = data.display_name || 'Unknown Location';

        onLocationChange({
          latitude: coords.lat,
          longitude: coords.lng,
          locationName,
        });
      } catch (err) {
        console.error('Reverse geocoding failed:', err);
        onLocationChange({
          latitude: coords.lat,
          longitude: coords.lng,
          locationName: 'Unknown Location',
        });
      }
    },
  });

  return position ? <Marker position={position} draggable={true} /> : null;
}

// 🔍 Search bar
function SearchLocationBar({
  onSearch,
}: {
  onSearch: (lat: number, lng: number, name: string) => void;
}) {
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
        const { lat, lon, display_name } = data[0];
        onSearch(parseFloat(lat), parseFloat(lon), display_name || query);
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
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const handleSearchLocation = (lat: number, lng: number, locationName: string) => {
    const newPos = { lat, lng };
    setPosition(newPos);
    onLocationChange({
      latitude: lat,
      longitude: lng,
      locationName,
    });

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
