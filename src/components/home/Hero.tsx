import React from "react";
import NavBarOne from "../NavBarOne";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full hero-background @max-4xl:bg-none bg-(image:--hero-bg) h-max flex flex-col items-center @max-4xl:pt-6 pt-7 2xl:pt-10 @max-4xl:pb-[60px] pb-[72px] bg-no-repeat bg-cover">
      <NavBarOne />
      <div className="2xl:mt-[72px] @max-4xl:mt-10 mt-12 w-full max-w-[1250px] px-5 h-max relative @max-4xl:pt-2.5 pt-8 2xl:pt-12 @max-4xl:pb-0 pb-[142px] 2xl:pb-[182px] flex justify-center">
        <div className="w-full max-w-[654px] 2xl:max-w-[714px] flex flex-col items-center">
          <h1 className="font-bold leading-[55px] @max-4xl:text-[48px] @max-4xl:leading-[64px] 2xl:leading-[64px] mb-6 text-[40px] 2xl:text-[48px] text-(--primary-black) text-center">
            Disrupting Food & Grocery Delivery in Africa
          </h1>
          <p className="font-normal @max-4xl:text-base @max-4xl:leading-6 text-sm 2xl:text-base leading-5 2xl:leading-7 text-[#5D5D5D] text-center mb-6">
            Jollof, egusi, or pizza—get it delivered fast with zero payment
            scams! Tap below to order now or download app
          </p>
          <div className="w-full @max-4xl:items-center @max-4xl:flex-col @max-3xl:mb-6 mb-[34px] flex gap-2.5">
            <div className="w-full gap-2.5 flex h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-6">
              <Image
                src="/images/magnifying-glass.svg"
                alt=""
                width={24}
                height={24}
                className="2xl:w-6 w-5"
              />
              <input
                placeholder="Type 'suya', 'amala', or vendor name..."
                className="w-full text-sm 2xl:text-base font-normal text-[#888888] placeholder:text-[#888888] h-full outline-none bg-transparent border-none"
              />
            </div>
            <div className="min-w-[184px] @max-4xl:w-[184px] h-[50px]">
              <div className="w-full text-[#888888] flex justify-between items-center cursor-pointer text-sm 2xl:text-base font-normal px-6 shadow-none min-h-[50px] border border-[#E7E7E7] rounded-[12px]">
                <Image
                  src="/images/location-pin.svg"
                  width={24}
                  height={24}
                  alt=""
                  className="2xl:w-6 w-5"
                />{" "}
                Location
                <Image
                  src="/images/chevron-down.svg"
                  width={24}
                  height={24}
                  alt=""
                  className="2xl:w-6 w-5"
                />
              </div>
            </div>
          </div>
          <div className="w-max @max-4xl:py-1.5 @max-4xl:w-[232px] @max-4xl:flex-col flex gap-2.5">
            <Link href="#">
              <Image
                alt=""
                src="/images/appstore-button.svg"
                width={232}
                height={64}
                className="2xl:w-[232px] @max-4xl:w-full w-[210px]"
              />
            </Link>
            <Link href="#">
              <Image
                alt=""
                src="/images/playstore-button.svg"
                width={232}
                height={64}
                className="2xl:w-[232px] @max-4xl:w-full w-[210px]"
              />
            </Link>
          </div>
        </div>
        <Image
          alt=""
          src="/images/hero/floating-1.svg"
          width={183}
          height={60}
          className="absolute top-[61px] 2xl:top-[81px] right-[70px] @max-5xl:hidden @max-6xl:right-5 2xl:w-[183px] w-[163px]"
        />
        <Image
          alt=""
          src="/images/hero/floating-2.svg"
          width={185}
          height={64}
          className="absolute 2xl:w-[185px] w-[165px] top-[87px] @max-5xl:hidden 2xl:top-[107px] @max-6xl:left-4 left-[65px]"
        />
        <Image
          alt=""
          src="/images/hero/floating-3.svg"
          width={320}
          height={76}
          className="absolute bottom-5 2xl:w-[320px] w-[280px] 2xl:bottom-9 @max-5xl:hidden left-[99px] @max-6xl:left-6 2xl:left-[119px]"
        />
        <Image
          alt=""
          src="/images/hero/floating-4.svg"
          width={180}
          height={64}
          className="absolute bottom-[80px] 2xl:bottom-[104px] 2xl:w-[180px] w-[160px] @max-6xl:right-4 @max-5xl:hidden right-[60px] 2xl:right-[78px]"
        />
      </div>
    </div>
  );
}
