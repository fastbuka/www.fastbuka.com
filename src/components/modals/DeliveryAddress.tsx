"use client";
import Image from "next/image";
import React from "react";

export default function DeliveryAddress() {
  return (
    <div className="w-[500px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-8 2xl:mb-10 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        Delivery Address
      </h4>

      <form className="w-full flex flex-col">
        <div className="w-full h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6 flex items-center gap-2.5">
          <Image
            src="/images/location-pin-green.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6"
          />
          <input
            type="text"
            className="w-full h-full border-none bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0]"
            placeholder="Enter your address"
          />
        </div>
      </form>
    </div>
  );
}
