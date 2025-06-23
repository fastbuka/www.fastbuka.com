import Authentication from "@/components/auth/Authentication";
import AuthenticatedModals from "@/components/AuthenticatedModals";
import Products from "@/components/browse-stores/Products";
import VendorHero from "@/components/browse-stores/VendorHero";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import Footer from "@/components/Footer";
import React from "react";

export default function Page() {
  return (
    <main className="w-full flex flex-col bg-[#F6FFFB]">
      <Authentication />
      <AuthenticatedModals />
      <VendorHero />
      <Products />
      <div className="w-full mt-8 2xl:mt-10 flex justify-center">
        <div className="w-full max-w-[1210px] px-5">
          <VendorsHorizontalList
            item={{
              title: "Search for more Restaurants",
              description:
                "Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app",
              list: vendors,
            }}
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

const vendors = Array(6).fill({
  image: "/images/dummy-vendor.svg",
  name: "AFRICAN   CHICKEN   FASTFOOD",
  heading: "Chicken Republic",
  time: "33- 40 mins",
});
