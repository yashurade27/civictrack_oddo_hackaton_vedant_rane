'use client';

import { useEffect, useRef } from 'react';

type Props = {
  latitude: number;
  longitude: number;
  title: string;
  status: 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
};

export default function ReportViewMap({ latitude, longitude, title, status }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      const location = { lat: latitude, lng: longitude };
      const map = new google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 15,
      });

      const marker = new google.maps.Marker({
        position: location,
        map,
        title,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${title}</h4>
            <p>Status: <strong>${status}</strong></p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    if ((window as any).google?.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [latitude, longitude, title, status]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}
