import Products from "@/components/browse-stores/Products";
import VendorHero from "@/components/browse-stores/VendorHero";
import React from "react";

export default function Page() {
  return (
    <main className="w-full flex flex-col bg-[#F6FFFB]">
      <VendorHero />
      <Products />
    </main>
  );
}
