"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function TapbarServices() {
  const RenderTabSection = () => {
    return (
      <div className="w-full @max-3xl:flex-col @max-4xl:gap-6 flex justify-between gap-[88px] items-center">
        <Image
          className="w-6/12 min-w-[50%] max-w-full @max-4xl:w-full @max-4xl:min-w-0"
          src="/images/phone-frame.svg"
          alt=""
          width={619}
          height={478}
        />
        <div className="w-full flex flex-col">
          <h2 className="text-(--primary-black) mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
            Order food seamlessly
          </h2>
          <p className=" font-normal mb-5 2xl:mb-6 max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
            Get your favorite African and continental dishes delivered fast -
            hot, fresh, and straight to your door!
          </p>
          <button
            onClick={() => {}}
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
          <RenderTabSection />
        </TabsContent>
        <TabsContent className="w-full" value="vendor">
          <RenderTabSection />
        </TabsContent>
        <TabsContent className="w-full" value="rider">
          <RenderTabSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
