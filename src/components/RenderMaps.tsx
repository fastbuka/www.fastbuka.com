"use client";

import { Vendor, VendorsResponse } from "@/schema";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { X } from "lucide-react";
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

const bucketURL = process.env.NEXT_PUBLIC_BUCKET_URL;
const bucketEnv = process.env.NEXT_PUBLIC_STORAGE_ENV;

export default function RenderMap({
  vendors,
}: {
  vendors?: VendorsResponse["vendors"];
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
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
              className=" cursor-pointer relative @max-3xl:w-[131px] w-[215px]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                }}
                className="w-5 h-5 hover:opacity-80 rounded-full bg-white absolute right-1 top-1 cursor-pointer flex justify-center items-center"
              >
                <X className="w-3 h-3" />
              </button>
              {selected.cover && (
                <Image
                  width={215}
                  height={60}
                  src={
                    bucketEnv && selected.cover.startsWith(bucketEnv)
                      ? `${bucketURL}/${selected.cover}`
                      : "/images/fries-with-chicken.svg"
                  }
                  alt=""
                  className="mb-2 w-[215px] h-[60px] @max-3xl:w-[131px] @max-3xl:h-[33px]"
                />
              )}
              <div className="w-full flex flex-col gap-0.5">
                <p className="font-normal text-black text-[10px]">
                  {selected?.name}
                </p>
                <p className="font-normal text-[#8D8C8C] text-[8px]">
                  {selected?.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <p className="font-normal text-black text-[8px]">
                    {selected?.ratings} stars
                  </p>
                  <div className="w-max flex">
                    {[...Array(selected.ratings)].map((_, index) => (
                      <Image
                        key={index}
                        src="/images/star.svg"
                        alt="star"
                        width={10}
                        height={10}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </>
    </GoogleMap>
  );
}
