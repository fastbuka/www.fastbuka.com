import Products from "@/components/browse-stores/Products";
import VendorHero from "@/components/browse-stores/VendorHero";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import Footer from "@/components/Footer";
import { getFeaturedVendors } from "@/lib/requests/vendors";
import React from "react";

export default async function Page() {
  const featuredVendors = await getFeaturedVendors();
  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <VendorHero />
      <Products />
      <div className="w-full mt-8 2xl:mt-10 flex justify-center">
        <div className="w-full max-w-[1210px] px-5">
          <VendorsHorizontalList
            title="Search for more Restaurants"
            data={featuredVendors}
            url="/api/v1/vendor/public/approved?sortField=featured"
            description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
          />
          <div className="w-full flex 2xl:mb-[111px] @max-4xl:mb-10 @max-4xl:mt-8 @max-4xl:justify-start mb-[81px] justify-center mt-16 2xl:mt-20">
            <button
              type="button"
              className="border-(--primary-green) bg-transparent w-max border hover:opacity-80 duration-200 text-(--primary-green) text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
            >
              View All
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
