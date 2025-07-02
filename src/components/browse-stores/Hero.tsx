"use client";
import React from "react";
import NavBarTwo from "@/components/NavBarTwo";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
      <NavBarTwo />
      <div className="2xl:mt-[88px] mt-[68px] @max-4xl:mt-[50px] w-full @max-4xl:pb-5 max-w-[1250px] px-5 h-max pb-[56px] 2xl:pb-[76px] flex flex-col items-center">
        <div className="w-full max-w-[512px] 2xl:max-w-[512px] flex flex-col items-center">
          <h1 className="font-bold @max-2xl:max-w-full leading-[55px] @max-4xl:text-[38px] @max-4xl:leading-[54px] 2xl:leading-[64px] mb-6 text-[40px] 2xl:text-[48px] text-(--primary-black) text-center">
            Find your favorite bukas, groceries, and more!
          </h1>
        </div>
        <div className="w-[976px] max-w-full pt-6 2xl:pt-8 flex flex-col items-center gap-4 2xl:gap-6">
          <p className="text-center font-medium text-(--primary-black) text-base 2xl:text-xl">
            Explore Categories
          </p>
          <div className="w-full p-2.5 flex flex-wrap justify-center max-w-full gap-2.5">
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="w-max px-4 min-w-[118px] cursor-pointer hover:opacity-70 duration-200 flex flex-col items-center justify-center gap-2.5 py-5 2xl:py-6 rounded-[12px] bg-[#EFFEF7]"
                >
                  <Image
                    src="/images/category.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 2xl:w-6"
                  />
                  <p className="text-[#19CE7C] text-center text-xs 2xl:text-sm font-medium">
                    {category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  "Restaurants",
  "Grocery",
  "Proteins",
  "Fast Food",
  "Buka",
  "Fine Dining",
];
