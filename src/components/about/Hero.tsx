import React from "react";
import NavBarOne from "../NavBarOne";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
      <NavBarOne />
      <div className="2xl:mt-10 mt-8 w-full @max-4xl:pb-3 max-w-[1250px] px-5 h-max pt-10 2xl:pt-12 pb-[56px] 2xl:pb-[76px] flex flex-col items-center">
        <div className="w-full max-w-[654px] 2xl:max-w-[714px] flex flex-col items-center">
          <h1 className="font-bold @max-2xl:max-w-full leading-[55px] @max-4xl:text-[38px] @max-4xl:leading-[54px] 2xl:leading-[64px] mb-6 text-[40px] 2xl:text-[48px] text-(--primary-black) text-center">
            Redefining African Food Delivery with Blockchain Trust
          </h1>
          <p className="font-normal @max-4xl:text-base @max-4xl:leading-6 text-sm 2xl:text-base leading-5 2xl:leading-7 text-[#5D5D5D] text-center mb-6">
            FastBuka connects customers to local vendors through instant,
            fraud-proof payments.
          </p>
        </div>
        <Image src="/images/about/hero.svg" alt="" width={1168} height={547} />
      </div>
    </div>
  );
}
