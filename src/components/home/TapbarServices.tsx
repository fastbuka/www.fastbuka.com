"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function TapbarServices() {
  const RenderTabSection = ({
    type,
  }: {
    type: "customer" | "vendor" | "rider";
  }) => {
    return (
      <div className="w-full @max-3xl:flex-col @max-4xl:gap-6 flex justify-between gap-[88px] items-center">
        <Image
          className="w-6/12 min-w-[50%] max-w-full @max-4xl:w-full @max-4xl:min-w-0"
          src={
            type === "customer"
              ? "/images/customer-phone-frame.png"
              : type === "vendor"
              ? "/images/phone-frame.png"
              : "/images/rider-phone-frame.png"
          }
          alt=""
          quality={100}
          width={619}
          height={478}
        />
        <div className="w-full flex flex-col">
          <h2 className="text-(--primary-black) mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
            {type === "customer"
              ? "Order food seamlessly"
              : type === "vendor"
              ? "Own Your Business, No Middlemen, No Limits"
              : "Riders Who Earn More"}
          </h2>
          <p className=" font-normal mb-5 2xl:mb-6 max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
            {type === "customer"
              ? "Get your favorite African and continental dishes delivered fast - hot, fresh, and straight to your door!"
              : type === "vendor"
              ? "Join Africa’s first decentralized food network! Set your own prices, get instant crypto/fiat payouts, and reach customers directly."
              : "Higher payouts per trip with real-time blockchain tracking. No more ‘customer didn’t pay’ disputes!"}
          </p>
          <button
            onClick={() => {
              if (type === "vendor") {
                window.open("https://vendor.fastbuka.com", "_blank");
              }
            }}
            className="bg-(--primary-green) w-max hover:opacity-80 duration-200 text-[#F6F6F6] text-lg font-normal py-3 px-6 mt-6 rounded-[12px]"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="w-[744px] max-w-full bg-[#FFF2C5]">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="rider">Rider</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="customer">
          <RenderTabSection type="customer" />
        </TabsContent>
        <TabsContent className="w-full" value="vendor">
          <RenderTabSection type="vendor" />
        </TabsContent>
        <TabsContent className="w-full" value="rider">
          <RenderTabSection type="rider" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
