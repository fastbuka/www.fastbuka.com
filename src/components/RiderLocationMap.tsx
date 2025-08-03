"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useEffect, useState, useMemo } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type RiderLocationMapProps = {
  lat?: number;
  lng?: number;
};

export default function RiderLocationMap({ lat, lng }: RiderLocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [iconSize, setIconSize] = useState<google.maps.Size | null>(null);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return;

    const isMobile = window.innerWidth < 768;
    setIconSize(
      new window.google.maps.Size(isMobile ? 18 : 26, isMobile ? 22 : 32)
    );
  }, [isLoaded]);

  const riderPosition = useMemo(() => {
    return lat !== undefined && lng !== undefined ? { lat, lng } : null;
  }, [lat, lng]);

  if (!isLoaded) {
    return (
      <div className="w-full text-sm text-(--primary-green) @max-3xl:text-xs h-full flex justify-center items-center">
        <div className="lds-ring w-8 h-8">
          <div className="w-8 h-8 border-6 border-(--primary-green)" />
          <div className="w-8 h-8 border-6 border-(--primary-green)" />
          <div className="w-8 h-8 border-6 border-(--primary-green)" />
          <div className="w-8 h-8 border-6 border-(--primary-green)" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={riderPosition || { lat: 0, lng: 0 }}
        zoom={riderPosition ? 15 : 2} // Zoom out if no position
      >
        {riderPosition && iconSize && (
          <Marker
            position={riderPosition}
            icon={{
              url: "/images/location.svg",
              scaledSize: iconSize,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
