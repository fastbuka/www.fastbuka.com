"use client";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

type MarkerType = {
  id: number;
  position: google.maps.LatLngLiteral;
  label?: string;
  description?: string;
  ratings?: number;
  image?: string;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 5.345,
  lng: 7.013,
};

const markersData: MarkerType[] = [
  {
    id: 1,
    position: { lat: 5.345, lng: 7.013 },
    label: "Shoprite",
    description: "No 1 Ikorodu road,Ikorodu Lagos",
    ratings: 4,
    image: "/images/shoprite-banner.png",
  },
];

const lightMapStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [{ saturation: 0 }, { lightness: 0 }],
  },
];

const mapOptions: google.maps.MapOptions = {
  styles: lightMapStyle,
  disableDefaultUI: true,
};

export default function RenderMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selected, setSelected] = useState<MarkerType | null>(null);
  const [iconSize, setIconSize] = useState<google.maps.Size | null>(null);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return;

    const isMobile = window.innerWidth < 768;
    setIconSize(
      new window.google.maps.Size(isMobile ? 18 : 26, isMobile ? 22 : 32)
    );
  }, [isLoaded]);

  if (!isLoaded || iconSize === null)
    return (
      <div className="w-full text-sm @max-3xl:text-xs h-full flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <GoogleMap
      options={mapOptions}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      {markersData.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onMouseOver={() => setSelected(marker)}
          onClick={() => {
            setSelected(marker);
          }}
          icon={{
            url: "/images/location-pin-green.svg",
            scaledSize: iconSize,
          }}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.position}
          options={{ headerDisabled: true }}
        ></InfoWindow>
      )}
    </GoogleMap>
  );
}
