"use client";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type LatLng = { lat: number | null; lng: number | null };

type RiderLocationMapProps = {
  rider?: LatLng;
  from?: LatLng;
  to?: LatLng;
};

// Helper to ensure lat/lng are valid (not null)
const isValidLatLng = (pos?: LatLng): pos is { lat: number; lng: number } => {
  return !!pos && pos.lat !== null && pos.lng !== null;
};

export default function RiderLocationMap({
  rider,
  from,
  to,
}: RiderLocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [iconSize, setIconSize] = useState<google.maps.Size | null>(null);
  const [pathCoords, setPathCoords] = useState<google.maps.LatLngLiteral[]>([]);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const center = useMemo(() => {
    if (isValidLatLng(to)) return to;
    if (isValidLatLng(from)) return from;
    if (isValidLatLng(rider)) return rider;
    return { lat: 0, lng: 0 };
  }, [rider, from, to]);

  // Set icon size based on screen size
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return;
    const isMobile = window.innerWidth < 768;
    setIconSize(
      new window.google.maps.Size(isMobile ? 30 : 40, isMobile ? 30 : 40)
    );
  }, [isLoaded]);

  // Fetch route between from -> to
  useEffect(() => {
    if (
      !isLoaded ||
      !isValidLatLng(from) ||
      !isValidLatLng(to) ||
      !window.google
    )
      return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const route = result.routes[0].overview_path;
          const coordinates = route.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          setPathCoords(coordinates);
        } else {
          console.error("Failed to fetch route:", status);
        }
      }
    );
  }, [isLoaded, from, to]);

  // Optional: Auto-follow rider's location
  useEffect(() => {
    if (mapRef && isValidLatLng(rider)) {
      mapRef.panTo(rider);
    }
  }, [rider, mapRef]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex justify-center items-center text-sm text-(--primary-green)">
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
        center={center}
        zoom={from && to ? 14 : 12}
        onLoad={(map) => setMapRef(map)}
      >
        {/* Rider live location */}
        {isValidLatLng(rider) && iconSize && (
          <Marker
            position={rider}
            icon={{
              url: "/images/rider_location.png",
              scaledSize: iconSize,
            }}
          />
        )}

        {/* Origin */}
        {isValidLatLng(from) && iconSize && (
          <Marker
            position={from}
            icon={{
              url: "/images/vendor_location.png",
              scaledSize: iconSize,
            }}
          />
        )}

        {/* Destination */}
        {isValidLatLng(to) && iconSize && (
          <Marker
            position={to}
            icon={{
              url: "/images/user_location.png",
              scaledSize: iconSize,
            }}
          />
        )}

        {/* Path from "from" to "to" */}
        {pathCoords.length > 0 && (
          <Polyline
            path={pathCoords}
            options={{
              strokeColor: "#FF9702",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
