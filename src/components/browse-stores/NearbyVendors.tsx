"use client";

import { useEffect, useState } from "react";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import { VendorsResponse } from "@/schema";
import { toast } from "sonner";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function NearbyVendors() {
  const [vendorsResponse, setVendorsResponse] =
    useState<VendorsResponse | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          try {
            const res = await fetch(
              `${endpoint}/api/v1/vendor/public/approved?latitude=${latitude}&longitude=${longitude}`
            );
            const data = await res.json();
            console.log(data);

            if (data?.success) {
              setVendorsResponse(data.data);
            }
          } catch (err) {
            console.log(err);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            getLocation();
          } else if (permissionStatus.state === "prompt") {
            getLocation();
          } else if (permissionStatus.state === "denied") {
            toast.warning(
              "Location access denied. Please enable it in your browser settings to see nearby vendors."
            );
          }
        });
    } else {
      getLocation();
    }
  }, []);

  if (!vendorsResponse) return null;

  return (
    <VendorsHorizontalList
      data={vendorsResponse}
      title="Handpicked for you"
      description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
      url={`/api/v1/vendor/public/approved?latitude=${latitude}&longitude=${longitude}`}
    />
  );
}
