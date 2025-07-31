"use client";

import { useEffect, useState } from "react";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import { VendorsResponse } from "@/schema";
import { useUser } from "@/contexts/UserContext";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function NearbyVendors() {
  const [vendorsResponse, setVendorsResponse] =
    useState<VendorsResponse | null>(null);
  const { location } = useUser();

  async function getVendors() {
    if (!location) {
      return;
    }
    try {
      const res = await fetch(
        `${endpoint}/api/v1/vendor/public/approved?latitude=${location.lat}&longitude=${location.lng}`
      );
      const data = await res.json();

      if (data?.success) {
        setVendorsResponse(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVendors();
  }, [location]);

  if (!vendorsResponse || !location) return null;

  return (
    <VendorsHorizontalList
      data={vendorsResponse}
      title="Handpicked for you"
      description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
      url={`/api/v1/vendor/public/approved?latitude=${location.lat}&longitude=${location.lng}`}
    />
  );
}
