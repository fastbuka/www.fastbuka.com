"use client";

import { Vendor, VendorsResponse } from "@/schema";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

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

export default function RenderMap({
  vendors,
}: {
  vendors?: VendorsResponse["vendors"];
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>();
  const router = useRouter();
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [iconSize, setIconSize] = useState<google.maps.Size | null>(null);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return;

    const isMobile = window.innerWidth < 768;
    setIconSize(
      new window.google.maps.Size(isMobile ? 18 : 26, isMobile ? 22 : 32)
    );
  }, [isLoaded]);

  useEffect(() => {
    if (vendors?.length) {
      const first = vendors[0];
      const lat = Number(first.latitude);
      const lng = Number(first.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        setCenter({ lat, lng });
      }
    }
  }, [vendors]);

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
      <>
        {vendors?.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              if (selected && selected?.uuid === marker.uuid) {
                setSelected(null);
              } else {
                setSelected(marker);
              }
            }}
            icon={{
              url: "/images/location.svg",
              scaledSize: iconSize,
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            onCloseClick={() => {
              setSelected(null);
            }}
            position={{ lat: selected.latitude, lng: selected.longitude }}
            options={{
              headerDisabled: true,
              pixelOffset: new window.google.maps.Size(0, -35),
            }}
          >
            <div
              onClick={() => {
                router.push(`/browse-stores/${selected.slug}`);
              }}
              className="w-[107px] flex justify-between items-center cursor-pointer hover:opacity-70 duration-300"
            >
              <p className="text-xs truncate text-[#1E2022] font-normal">
                {selected.name}
              </p>{" "}
              <Image
                src="/images/chevron-right.svg"
                alt=""
                height={12}
                width={6.7}
                className="min-w-1.5"
              />
            </div>
          </InfoWindow>
        )}
      </>
    </GoogleMap>
  );
}
