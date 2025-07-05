"use client";
import React from "react";
import NavBarTwo from "@/components/NavBarTwo";
import Image from "next/image";
import GoBack from "../GoBack";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { Vendor } from "@/schema";

export default function VendorHero({
  vendor,
  category,
  slug,
}: {
  vendor?: Vendor;
  category?: string;
  slug: string;
}) {
  return (
    <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
      <NavBarTwo />
      <div className="2xl:mt-14 mt-11 @max-4xl:mt-[50px] w-full max-w-[1210px] px-5 h-max flex flex-col">
        <GoBack />
        <Image
          src="/images/fries-with-chicken.svg"
          alt=""
          width={1210}
          height={530}
          className="w-full mt-6 2xl:mt-8 mb-9 2xl:mb-11"
        />
        <div className="w-full @max-4xl:flex-col @max-4xl:gap-6 flex items-start justify-between mb-7 2xl:mb-8">
          <div className="w-max flex flex-col">
            <p className="text-[#19CE7C] font-normal text-base 2xl:text-[19px] mb-4 2xl:mb-[19px]">
              FASTBUKA VENDOR
            </p>
            <h1 className="font-semibold text-(--primary-black) text-[28px] 2xl:text-[38px] mb-4 2xl:mb-[19px]">
              {vendor?.name}
            </h1>
            <div className="flex items-center gap-2.5">
              <Image src="/images/clock.svg" alt="" width={16} height={16} />
              <p className="text-sm text-[#5D5D5D] font-normal">
                {vendor?.opening_time} - {vendor?.closing_time}
              </p>
            </div>
          </div>
          <Tabs defaultValue="delivery" className="w-[497px] max-w-full">
            <TabsList className="w-[497px] max-w-full bg-[#DAFEEC]">
              <TabsTrigger
                className="data-[state=active]:bg-(--primary-green) @max-4xl:text-xs"
                value="pickup"
              >
                Pick Up
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-(--primary-green) @max-4xl:text-xs"
                value="delivery"
              >
                Delivery
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full border-b border-[#E7E7E7] pb-6 overflow-x-auto scroll-hidden">
          <div className="w-max flex gap-7 2xl:gap-8">
            <button
              onClick={() => {
                window.location.href = `/browse-stores/${slug}`;
              }}
              className={cn(
                "px-6 py-2.5 rounded-[12px] cursor-pointer hover:opacity-70 duration-200 bg-transparent text-[#888888] text-base 2xl:text-xl",
                {
                  "bg-[#DAFEEC] text-[#19CE7C]": !category,
                }
              )}
            >
              All
            </button>
            {vendor?.categories?.map((cat, index) => {
              const isSelected = category === cat;
              return (
                <button
                  key={index}
                  onClick={() => {
                    window.location.href = `/browse-stores/${slug}?category=${cat}`;
                  }}
                  className={cn(
                    "px-6 py-2.5 rounded-[12px] cursor-pointer hover:opacity-70 duration-200 bg-transparent text-[#888888] text-base 2xl:text-xl",
                    {
                      "bg-[#DAFEEC] text-[#19CE7C]": isSelected,
                    }
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
