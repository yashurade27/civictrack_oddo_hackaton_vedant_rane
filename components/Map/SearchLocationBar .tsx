'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Utility to merge Tailwind classes

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  onSearch: (lat: number, lng: number) => void;
};

export function SearchLocationBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Suggestion fetch failed:', err);
      }
    }, 300); // debounce
  }, [query]);

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
        setShowSuggestions(false);
      } else {
        alert('Location not found.');
      }
    } catch (err) {
      console.error('Location search failed:', err);
      alert('Something went wrong while searching.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (s: Suggestion) => {
    setQuery(s.display_name);
    setShowSuggestions(false);
    onSearch(parseFloat(s.lat), parseFloat(s.lon));
  };

  return (
    <div className="mb-4 relative">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow text-sm max-h-48 overflow-auto">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className={cn(
                'px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors',
              )}
              onClick={() => handleSuggestionClick(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
